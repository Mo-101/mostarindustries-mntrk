import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { OpenAI } from "https://esm.sh/langchain@0.0.197/llms/openai"
import { PromptTemplate } from "https://esm.sh/langchain@0.0.197/prompts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const MAX_RETRIES = 5;
const INITIAL_DELAY = 1000; // 1 second

async function callOpenAIWithRetry(message: string) {
  let attempt = 0;
  let delay = INITIAL_DELAY;

  while (attempt < MAX_RETRIES) {
    try {
      const model = new OpenAI({
        openAIApiKey: Deno.env.get('OPENAI_API_KEY'),
        modelName: "gpt-4o-mini",
        temperature: 0.7,
        maxTokens: 500,
      });

      const prompt = PromptTemplate.fromTemplate(
        "You are an AI assistant specializing in environmental monitoring and disease tracking. Answer the following question: {question}"
      );

      const formattedPrompt = await prompt.format({
        question: message,
      });

      return await model.call(formattedPrompt);
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} failed:`, error);

      if (attempt === MAX_RETRIES || !error.message.includes('429')) {
        throw error;
      }

      console.log(`Waiting ${delay}ms before retry...`);
      await sleep(delay);
      delay *= 2; // Exponential backoff
    }
  }
  throw new Error('Max retries reached');
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message } = await req.json();
    console.log('Received message:', message);

    const response = await callOpenAIWithRetry(message);
    console.log('Successfully generated response');

    return new Response(
      JSON.stringify({ response }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in chat function:', error);
    
    let errorMessage = error.message;
    let statusCode = 500;

    if (error.message.includes('429')) {
      errorMessage = 'The service is experiencing high demand. Please try again in a few moments.';
      statusCode = 429;
    }

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: statusCode,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { OpenAI } from "https://esm.sh/langchain@0.0.197/llms/openai"
import { PromptTemplate } from "https://esm.sh/langchain@0.0.197/prompts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    
    const model = new OpenAI({
      openAIApiKey: Deno.env.get('OPENAI_API_KEY'),
      modelName: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 500,
    })

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const prompt = PromptTemplate.fromTemplate(
      "You are an AI assistant specializing in environmental monitoring and disease tracking. Answer the following question: {question}"
    )

    const formattedPrompt = await prompt.format({
      question: message,
    })

    const response = await model.call(formattedPrompt)

    return new Response(
      JSON.stringify({ response }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in chat function:', error)
    
    let errorMessage = error.message
    let statusCode = 500

    if (error.message.includes('429')) {
      errorMessage = 'Rate limit exceeded. Please try again in a few moments.'
      statusCode = 429
    }

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: statusCode,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
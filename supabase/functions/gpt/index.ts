import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { OpenAI } from "https://esm.sh/langchain@0.0.197/llms/openai";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { query, type } = await req.json();

    if (!query || !type) {
      return new Response(
        JSON.stringify({ error: "Query and type are required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const model = new OpenAI({
      openAIApiKey: Deno.env.get('OPENAI_API_KEY')!,
      modelName: 'gpt-4',
      temperature: 0.7,
    });

    let prompt = '';
    switch (type) {
      case 'analysis':
        prompt = `Analyze the following environmental data and provide insights: ${query}`;
        break;
      case 'prediction':
        prompt = `Based on the data: ${query}, predict potential environmental changes.`;
        break;
      default:
        prompt = `Answer the following question about environmental data: ${query}`;
    }

    console.log('Generated Prompt:', prompt);

    const response = await model.call(prompt);

    return new Response(
      JSON.stringify({ result: response }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in GPT process:', error);

    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Configuration, OpenAIApi } from "openai"; // Direct OpenAI import

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

    const configuration = new Configuration({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    });
    const openai = new OpenAIApi(configuration);

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

    const completion = await openai.createCompletion({
      model: "gpt-3.5-turbo", // Or gpt-4, or any other model
      prompt: prompt,
      temperature: 0.7,
      max_tokens: 500, // Adjust as needed
    });
    const response = completion.data.choices[0].text!.trim();


    await supabaseClient
      .from('chat_history') // Make sure this table exists
      .insert([
        { query, response, type, timestamp: new Date().toISOString() },
      ]);

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


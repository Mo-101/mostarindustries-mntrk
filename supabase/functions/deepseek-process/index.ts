
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

    console.log('Processing query:', query);
    
    // For now, implement a simple response mechanism
    // You can later integrate with a proper hosted LLM API
    const responses = {
      analysis: "Based on the analysis of Mastomys patterns, there appears to be significant activity in the specified region.",
      prediction: "Based on historical data and current patterns, Mastomys activity is likely to increase in the coming weeks.",
      general: "The Mastomys tracking system is functioning normally and monitoring activity patterns."
    };

    const answer = responses[type] || responses.general;
    console.log('Generated response:', answer);

    return new Response(
      JSON.stringify({ result: answer }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error in DeepSeek process:', error);

    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: 'An error occurred while processing your request'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});


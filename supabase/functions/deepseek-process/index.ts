
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
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

    console.log('Processing query:', { query, type });
    
    // Process based on type with predefined responses for testing
    let response;
    switch(type) {
      case 'analysis':
        response = "Based on the analysis of Mastomys patterns, there appears to be significant activity in the specified region.";
        break;
      case 'prediction':
        response = "Based on historical data and current patterns, Mastomys activity is likely to increase in the coming weeks.";
        break;
      default:
        response = "The Mastomys tracking system is functioning normally and monitoring activity patterns.";
    }

    console.log('Generated response:', response);

    return new Response(
      JSON.stringify({ result: response }),
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

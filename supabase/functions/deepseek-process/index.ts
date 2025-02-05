
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const FLASK_API_URL = Deno.env.get('FLASK_API_URL') || 'http://localhost:5000';
const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { query, type, userId } = await req.json();

    if (!query || !type) {
      return new Response(
        JSON.stringify({ error: "Query and type are required" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Processing query:', { query, type, userId });

    // Get context from Supabase if needed
    let context = '';
    if (type === 'analysis') {
      const { data: contextData, error: contextError } = await supabase
        .from('environmental_data')
        .select('data_value')
        .order('recorded_at', { ascending: false })
        .limit(1);

      if (contextError) {
        console.error('Error fetching context:', contextError);
      } else if (contextData && contextData.length > 0) {
        context = JSON.stringify(contextData[0].data_value);
      }
    }

    // Process based on type
    let response;
    switch(type) {
      case 'analysis':
        response = `Based on the analysis of Mastomys patterns and environmental data (${context}), there appears to be significant activity in the specified region.`;
        break;
      case 'prediction':
        response = "Based on historical data and current patterns, Mastomys activity is likely to increase in the coming weeks.";
        break;
      default:
        response = "The Mastomys tracking system is functioning normally and monitoring activity patterns.";
    }

    // Store the interaction in Supabase
    const { error: logError } = await supabase
      .from('knowledge_base')
      .insert({
        title: `User Query - ${type}`,
        content: query,
        tags: [type],
      });

    if (logError) {
      console.error('Error logging to knowledge base:', logError);
    }

    // Call Flask API for additional processing if needed
    try {
      const flaskResponse = await fetch(`${FLASK_API_URL}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: query,
          context: context,
        }),
      });

      if (flaskResponse.ok) {
        const flaskData = await flaskResponse.json();
        console.log('Flask API response:', flaskData);
        response = flaskData.response || response;
      }
    } catch (flaskError) {
      console.error('Error calling Flask API:', flaskError);
      // Continue with default response if Flask API fails
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

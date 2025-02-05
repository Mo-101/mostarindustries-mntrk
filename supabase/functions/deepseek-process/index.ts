
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders 
    });
  }

  try {
    const { query, type } = await req.json();
    console.log('Received request:', { query, type });

    if (!query || !type) {
      console.log('Missing required fields');
      return new Response(
        JSON.stringify({ error: "Query and type are required" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Call DeepSeek API
    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${deepseekApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: type === 'analysis' 
              ? "You are an expert in analyzing Mastomys patterns and behavior."
              : type === 'prediction'
              ? "You are an expert in predicting Mastomys movement patterns based on historical data."
              : "You are a helpful assistant for the Mastomys tracking system."
          },
          {
            role: "user",
            content: query
          }
        ],
        stream: false
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('DeepSeek API error:', error);
      throw new Error(error.error?.message || 'Failed to get response from DeepSeek');
    }

    const data = await response.json();
    const result = data.choices[0].message.content;
    console.log('Received response from DeepSeek:', result);

    return new Response(
      JSON.stringify({ result }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 200 
      }
    );
  } catch (error) {
    console.error('Error processing request:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        details: 'An error occurred while processing your request'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

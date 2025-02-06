
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
    console.log('Request received:', req.method);
    
    if (req.method !== 'POST') {
      throw new Error(`HTTP method ${req.method} not allowed`);
    }

    const requestData = await req.json();
    console.log('Request data:', requestData);

    const { query, type, schema } = requestData;

    if (!query || !type) {
      throw new Error('Query and type are required fields');
    }

    const deepseekApiKey = Deno.env.get('DEEPSEEK_API_KEY');
    if (!deepseekApiKey) {
      throw new Error('DeepSeek API key not configured');
    }

    console.log('Making request to DeepSeek API...');
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
              ? "You are an expert in analyzing Mastomys patterns and behavior. Provide detailed scientific analysis."
              : type === 'prediction'
              ? "You are an expert in predicting Mastomys movement patterns based on historical data. Provide evidence-based predictions."
              : "You are a helpful assistant for the Mastomys tracking system. Provide clear and accurate information."
          },
          {
            role: "user",
            content: query
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: false,
        ...(schema && { response_format: { type: "json_schema", schema } })
      }),
    });

    console.log('DeepSeek API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      console.error('DeepSeek API error:', errorData);
      throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('DeepSeek API response data:', data);

    return new Response(
      JSON.stringify({ 
        result: data.choices[0].message.content,
        raw: data
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in edge function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred',
        details: error.stack || 'No additional details available'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.status || 500 
      }
    );
  }
});

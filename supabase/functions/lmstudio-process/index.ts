
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const LM_STUDIO_BASE_URL = 'http://localhost:1234';

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { 
      status: 204, 
      headers: corsHeaders 
    });
  }

  try {
    const url = new URL(req.url);
    const endpoint = url.pathname.split('/').pop();
    console.log('Request received:', { method: req.method, endpoint });

    let response;

    switch (endpoint) {
      case 'models':
        response = await fetch(`${LM_STUDIO_BASE_URL}/v1/models`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        break;

      case 'chat':
        const chatData = await req.json();
        response = await fetch(`${LM_STUDIO_BASE_URL}/v1/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(chatData)
        });
        break;

      case 'completions':
        const completionData = await req.json();
        response = await fetch(`${LM_STUDIO_BASE_URL}/v1/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(completionData)
        });
        break;

      case 'embeddings':
        const embeddingData = await req.json();
        response = await fetch(`${LM_STUDIO_BASE_URL}/v1/embeddings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(embeddingData)
        });
        break;

      default:
        throw new Error('Invalid endpoint');
    }

    if (!response.ok) {
      throw new Error(`LM Studio server error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('LM Studio server response:', data);

    return new Response(
      JSON.stringify({ result: data }),
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

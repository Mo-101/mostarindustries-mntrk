
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

const LM_STUDIO_BASE_URL = 'http://localhost:1234';

function logRequest(method: string, endpoint: string, body?: any) {
  console.log('Request:', { method, endpoint, body: body ? JSON.stringify(body) : undefined });
}

function logResponse(endpoint: string, data: any) {
  console.log('Response from', endpoint + ':', JSON.stringify(data));
}

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
    logRequest(req.method, endpoint || '');

    let response;
    let requestBody;

    switch (endpoint) {
      case 'models':
        response = await fetch(`${LM_STUDIO_BASE_URL}/v1/models`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
        });
        break;

      case 'chat':
        requestBody = await req.json();
        logRequest('POST', 'chat', requestBody);
        
        response = await fetch(`${LM_STUDIO_BASE_URL}/v1/chat/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...requestBody,
            stream: false // Ensure streaming is disabled for consistent handling
          })
        });
        break;

      case 'completions':
        requestBody = await req.json();
        logRequest('POST', 'completions', requestBody);
        
        response = await fetch(`${LM_STUDIO_BASE_URL}/v1/completions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });
        break;

      case 'embeddings':
        requestBody = await req.json();
        logRequest('POST', 'embeddings', requestBody);
        
        response = await fetch(`${LM_STUDIO_BASE_URL}/v1/embeddings`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        });
        break;

      default:
        throw new Error('Invalid endpoint');
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`LM Studio server error: ${response.status} ${response.statusText}`, errorText);
      throw new Error(`LM Studio server error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    logResponse(endpoint || '', data);

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

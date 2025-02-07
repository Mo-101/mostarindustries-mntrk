
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LLM_BASE_URL = "http://192.168.0.102:1234";
const LLM_API_KEY = "sk-330b8cd8f8b54871b589c358a00f5e03";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Request received:', req.method);
    const { type, prompt, model = "default" } = await req.json();
    
    let endpoint;
    switch (type) {
      case 'chat':
        endpoint = '/v1/chat/completions';
        break;
      case 'completion':
        endpoint = '/v1/completions';
        break;
      case 'embedding':
        endpoint = '/v1/embeddings';
        break;
      case 'models':
        endpoint = '/v1/models';
        break;
      default:
        throw new Error('Invalid request type');
    }

    console.log(`Making request to ${LLM_BASE_URL}${endpoint}`);
    
    const startTime = Date.now();
    
    const response = await fetch(`${LLM_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LLM_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: type === 'models' ? null : JSON.stringify({
        model: model,
        messages: type === 'chat' ? [
          { role: "user", content: prompt }
        ] : undefined,
        prompt: type !== 'chat' ? prompt : undefined,
        input: type === 'embedding' ? prompt : undefined,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('LLM API error:', errorData);
      throw new Error(`LLM API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const responseTime = (Date.now() - startTime) / 1000; // Convert to seconds

    // Store response in database if it's not a models request
    if (type !== 'models') {
      const { supabase } = await import('https://esm.sh/@supabase/supabase-js@2');
      const supabaseClient = supabase.createClient(
        Deno.env.get('SUPABASE_URL') ?? '',
        Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
      );

      // Get model ID from the models table or create if it doesn't exist
      const { data: modelData } = await supabaseClient
        .from('llm_models')
        .select('id')
        .eq('name', model)
        .eq('base_url', LLM_BASE_URL)
        .single();

      let modelId;
      if (!modelData) {
        const { data: newModel } = await supabaseClient
          .from('llm_models')
          .insert({
            name: model,
            model_type: type,
            base_url: LLM_BASE_URL,
          })
          .select('id')
          .single();
        modelId = newModel?.id;
      } else {
        modelId = modelData.id;
      }

      // Store the response
      await supabaseClient
        .from('llm_responses')
        .insert({
          model_id: modelId,
          prompt: prompt,
          response: JSON.stringify(data),
          response_time: responseTime,
          metadata: {
            type: type,
            timestamp: new Date().toISOString(),
          },
        });
    }

    return new Response(
      JSON.stringify({ result: data }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error('Error in deepseek-process function:', error);
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


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

    console.log('Sending request to DeepSeek with query:', query);

    const response = await fetch("http://localhost:1234/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content: type === 'analysis' 
              ? "You are a helpful assistant that specializes in Mastomys analysis." 
              : type === 'prediction'
              ? "You are a helpful assistant that specializes in Mastomys prediction."
              : "You are a helpful assistant that specializes in Mastomys tracking and analysis."
          },
          {
            role: "user",
            content: query
          }
        ],
        model: "deepseek-r1-distill-qwen-7b",
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Received response from DeepSeek:', result);

    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      throw new Error('Invalid response format from DeepSeek');
    }

    const answer = result.choices[0].message.content;

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
        details: 'Make sure LM Studio is running with DeepSeek model loaded on localhost:1234'
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});

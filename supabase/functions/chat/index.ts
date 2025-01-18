import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import OpenAI from "https://esm.sh/openai@4.20.1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    
    const openai = new OpenAI({
      apiKey: Deno.env.get('OPENAI_API_KEY'),
    })

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using the mini model to avoid quota issues
      messages: [{ role: "user", content: message }],
      temperature: 0.7,
      max_tokens: 500, // Adding token limit
    })

    return new Response(
      JSON.stringify({ response: response.choices[0].message.content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in chat function:', error)
    
    // Better error handling with specific messages
    let errorMessage = error.message
    let statusCode = 500

    if (error.message.includes('429')) {
      errorMessage = 'Rate limit exceeded. Please try again in a few moments.'
      statusCode = 429
    }

    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: statusCode,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
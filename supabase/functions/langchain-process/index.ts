import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Max-Age': '86400',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      headers: { 
        ...corsHeaders,
        'Content-Type': 'text/plain'
      }
    })
  }

  try {
    // Validate request method
    if (req.method !== 'POST') {
      throw new Error(`HTTP method ${req.method} is not allowed`)
    }

    // Parse and validate request body
    const body = await req.json()
    const { query, type } = body

    if (!query) {
      throw new Error('Query parameter is required')
    }

    console.log('Processing request:', { type, query })
    
    // Define system message based on type
    let systemMessage = ''
    switch(type) {
      case 'analysis':
        systemMessage = 'You are an AI assistant specializing in environmental monitoring and disease tracking. Analyze the provided data and provide insights.'
        break
      case 'prediction':
        systemMessage = 'You are an AI assistant specializing in environmental monitoring and disease tracking. Make predictions based on the provided data.'
        break
      default:
        systemMessage = 'You are an AI assistant specializing in environmental monitoring and disease tracking.'
    }

    console.log('Using system message:', systemMessage)

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          { role: 'user', content: query }
        ],
        temperature: 0.7,
        max_tokens: 500
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('OpenAI API error:', error)
      throw new Error(error.error?.message || 'Failed to get response from OpenAI')
    }

    const data = await response.json()
    console.log('OpenAI response received')

    // Return successful response
    return new Response(
      JSON.stringify({ 
        result: data.choices[0].message.content,
        type: type 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in chat process:', error)
    
    // Return detailed error response
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack,
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json'
        },
        status: 500
      }
    )
  }
})
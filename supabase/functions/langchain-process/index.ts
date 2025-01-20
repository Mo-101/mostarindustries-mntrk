import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { ChatOpenAI } from "https://esm.sh/@langchain/openai"
import { PromptTemplate } from "https://esm.sh/@langchain/core/prompts"
import { LLMChain } from "https://esm.sh/langchain/chains"

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
    
    // Initialize ChatOpenAI with proper configuration
    const llm = new ChatOpenAI({
      openAIApiKey: Deno.env.get('OPENAI_API_KEY'),
      modelName: 'gpt-4o-mini',
      temperature: 0.7,
      maxTokens: 500
    })

    // Define template based on type
    let template = ''
    switch(type) {
      case 'analysis':
        template = `You are an AI assistant specializing in environmental monitoring and disease tracking. Analyze the following data and provide insights: {query}`
        break
      case 'prediction':
        template = `You are an AI assistant specializing in environmental monitoring and disease tracking. Based on the data: {query}, predict potential environmental changes`
        break
      default:
        template = `You are an AI assistant specializing in environmental monitoring and disease tracking. Answer the following question: {query}`
    }

    console.log('Using template:', template)

    // Create prompt and chain
    const prompt = PromptTemplate.fromTemplate(template)
    const chain = new LLMChain({ llm, prompt })
    
    // Execute chain
    console.log('Executing LangChain...')
    const response = await chain.call({ query })
    console.log('LangChain response received:', response)

    // Return successful response
    return new Response(
      JSON.stringify({ 
        result: response.text,
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
    console.error('Error in langchain-process:', error)
    
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
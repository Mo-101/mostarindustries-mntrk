import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { ChatOpenAI } from "https://esm.sh/@langchain/openai"
import { PromptTemplate } from "https://esm.sh/@langchain/core/prompts"
import { LLMChain } from "https://esm.sh/langchain/chains"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { query, type } = await req.json()
    
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

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

    // Create prompt and chain
    const prompt = PromptTemplate.fromTemplate(template)
    const chain = new LLMChain({ llm, prompt })
    
    // Execute chain
    const response = await chain.call({ query })

    // Return successful response
    return new Response(
      JSON.stringify({ result: response.text }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    console.error('Error in langchain-process:', error)
    
    // Return detailed error response
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
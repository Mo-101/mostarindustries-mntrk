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
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { query, type } = await req.json()
    
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    )

    const llm = new ChatOpenAI({
      openAIApiKey: Deno.env.get('OPENAI_API_KEY'),
      modelName: 'gpt-4o-mini',
      temperature: 0
    })

    let template = ''
    switch(type) {
      case 'analysis':
        template = `Analyze the following environmental data and provide insights: {query}`
        break
      case 'prediction':
        template = `Based on the data: {query}, predict potential environmental changes`
        break
      default:
        template = `Answer the following question about environmental data: {query}`
    }

    const prompt = PromptTemplate.fromTemplate(template)
    const chain = new LLMChain({ llm, prompt })
    
    const response = await chain.call({ query })

    return new Response(
      JSON.stringify({ result: response.text }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500
      }
    )
  }
})
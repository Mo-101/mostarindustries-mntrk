import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { ChatOpenAI } from "npm:@langchain/openai"
import { StringOutputParser } from "npm:@langchain/core/output_parsers"
import { ChatPromptTemplate } from "npm:@langchain/core/prompts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { message } = await req.json()
    
    const chatModel = new ChatOpenAI({
      openAIApiKey: Deno.env.get('OPENAI_API_KEY'),
      modelName: "gpt-4o-mini",
      temperature: 0.7,
      maxTokens: 500,
    })

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are a helpful AI assistant focused on providing clear and concise responses about weather and environmental data."],
      ["human", "{input}"]
    ])

    const chain = prompt.pipe(chatModel).pipe(new StringOutputParser())

    const response = await chain.invoke({
      input: message
    })

    return new Response(
      JSON.stringify({ response }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error in chat function:', error)
    
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
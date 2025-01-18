import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import "https://deno.land/x/xhr@0.1.0/mod.ts"
import { ChatOpenAI } from "langchain/chat_models/openai"
import { StringOutputParser } from "langchain/schema/output_parser"
import { ChatPromptTemplate } from "langchain/prompts"
import { SupabaseVectorStore } from "langchain/vectorstores/supabase"
import { createClient } from "@supabase/supabase-js"

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
      modelName: "gpt-4",
      temperature: 0.7,
      maxTokens: 500,
    })

    // Initialize Supabase client for vector store
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Create vector store
    const vectorStore = new SupabaseVectorStore(chatModel, {
      client: supabaseClient,
      tableName: 'knowledge_base',
      queryName: 'match_documents'
    })

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", "You are an AI assistant specializing in environmental monitoring and disease tracking. Use the knowledge base to provide accurate information about weather patterns, disease outbreaks, and environmental conditions. If you're not sure about something, say so."],
      ["human", "{input}"]
    ])

    // Create a chain that combines the prompt with the model and vector store
    const chain = prompt.pipe(chatModel).pipe(new StringOutputParser())

    const response = await chain.invoke({
      input: message,
      vectorStore
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
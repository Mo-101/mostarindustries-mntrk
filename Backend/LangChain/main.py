# Main LangChain Script

from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv("configs/.env")

# Check API keys
openai_key = os.getenv("OPENAI_API_KEY")
langchain_key = os.getenv("LANGCHAIN_API_KEY")

print("OpenAI API Key:", openai_key)
print("LangChain API Key:", langchain_key)

# Test LangChain
print("Hello, LangChain!")

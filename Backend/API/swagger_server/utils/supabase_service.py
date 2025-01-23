from supabase import create_client
import os

# Initialize Supabase Client
supabase_url = os.getenv("SUPABASE_URL")
supabase_key = os.getenv("SUPABASE_KEY")
supabase = create_client(supabase_url, supabase_key)

def fetch_data(table_name):
    response = supabase.table(table_name).select("*").execute()
    if response.error:
        return {"error": response.error.message}
    return response.data

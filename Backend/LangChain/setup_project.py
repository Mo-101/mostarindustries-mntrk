import os

# Base path for the project
base_path = r"C:\Users\AI\Documents\GitHub\HFC\celestial-map-portal\Backend\LangChain"

# Subfolders to create
subfolders = ["configs", "scripts", "logs", "data"]

# Files to create
files = [
    {"name": "main.py", "content": """# Main LangChain Script\nprint("Hello, LangChain!")\n"""},
    {"name": "requirements.txt", "content": "langchain\nlangsmith\nopenai\npython-dotenv"},
    {"name": ".env", "content": "OPENAI_API_KEY=\nLANGCHAIN_API_KEY=\nLANGCHAIN_TRACING_V2=true"}
]

# Create subfolders
for folder in subfolders:
    folder_path = os.path.join(base_path, folder)
    os.makedirs(folder_path, exist_ok=True)
    print(f"Created folder: {folder_path}")

# Create files
for file in files:
    file_path = os.path.join(base_path, file["name"])
    with open(file_path, "w") as f:
        f.write(file["content"])
    print(f"Created file: {file_path}")

print("Setup complete!")

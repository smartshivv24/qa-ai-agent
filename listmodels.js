const GEMINI_API_KEY = "AIzaSyAWjnvR2uvo6xcW3LDKWaSd7UwU1JyO1-g";

async function listModels() {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${GEMINI_API_KEY}`
  );
  const data = await response.json();
  
  data.models.forEach(model => {
    console.log(model.name);
  });
}

listModels();
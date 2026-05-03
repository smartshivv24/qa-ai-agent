const GROQ_API_KEY = "your-groq-api-key-here";
const readline = require("readline");

const fs = require("fs"); // 👈 built-in Node module to handle files

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 👇 This is the "personality" of your AI agent
const SYSTEM_PROMPT = `You are a senior QA engineer with 10 years of experience. 
When given a feature description, you generate detailed test cases covering:
- Positive scenarios
- Negative scenarios  
- Edge cases
- Boundary value cases
Format each test case with: Test Case ID, Description, Preconditions, Steps, Expected Result.`;

async function callAI(userMessage) {
  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userMessage }
      ]
    })
  });

  //console.log(JSON.stringify(data, null, 2));
  const data = await response.json();
  console.log("\n🤖 AI Response:\n");
  const result = data.choices[0].message.content; // 👈 store it in a variable
  console.log(result);
  console.log("\n-------------------\n");

  // 👇 Save output to a file
  const filename = `testcases_${Date.now()}.txt`;
  fs.writeFileSync(filename, result);
  console.log(`\n✅ Test cases saved to: ${filename}\n`);
}

rl.question("👤 You: ", async (userInput) => {
  await callAI(userInput);
  rl.close();
});
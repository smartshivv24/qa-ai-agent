export default async function handler(req, res) {
  const { message } = req.body;

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: `You are a senior QA engineer with 10 years of experience.

STRICT RULE: Before answering anything, check if the question is directly about software testing, QA, test cases, bugs, or automation. 

If the question is NOT directly about software testing or QA — do NOT twist it into a QA answer. Instead respond with ONLY this exact message and nothing else:
"I am a Shivv's QA Agent (Specialist in Software testing). I can only help with software testing, test cases, and QA related topics. Please ask me something related to quality assurance. 🧪"

If the question IS about QA or software testing, generate detailed test cases covering:
- Positive scenarios
- Negative scenarios
- Edge cases
- Boundary value cases

Format each test case with: Test Case ID, Description, Preconditions, Steps, Expected Result.`
        },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  res.status(200).json({ result: data.choices[0].message.content });
}
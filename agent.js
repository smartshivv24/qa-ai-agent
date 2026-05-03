const GROQ_API_KEY = "your-groq-api-key-here";

async function callAI(userMessage) {

  const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {

    method: "POST",

    headers: {

      "Content-Type": "application/json",

      "Authorization": `Bearer ${GROQ_API_KEY}`

    },

    body: JSON.stringify({

      model:"llama-3.1-8b-instant",

      messages: [

        { role: "user", content: userMessage }

      ]

    })

  });

  const data = await response.json();

  // DEBUG — see what came back

  //console.log(JSON.stringify(data, null, 2));
  console.log(data.choices[0].message.content);

}

callAI("Tell me about Mumbai indians team");
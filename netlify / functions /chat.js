exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }
  try {
    const { messages } = JSON.parse(event.body);
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + process.env.GROQ_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-120b",
        messages: messages,
        temperature: 0.8,
        max_tokens: 300
      })
    });
    const data = await res.json();
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: data.choices[0].message.content })
    };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ reply: "Error Catur!" }) };
  }
};

export const handler = async (event, context) => {
  const apiKey = process.env.API_KEY;

  const payload = JSON.parse(event.body);

  const apiUrl =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify({
      text: data.candidates?.[0]?.content?.parts?.[0]?.text || ""
    })
  };
};

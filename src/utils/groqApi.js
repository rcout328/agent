import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY || "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",
  dangerouslyAllowBrowser: true
});

export const callGroqApi = async (messages) => {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://api.groq.com/openai/v1/chat/completions';
    const apiKey = process.env.NEXT_PUBLIC_GROQ_API_KEY;

    if (!apiKey) {
      throw new Error('GROQ API key not found');
    }

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: messages,
        temperature: 0.7,
        max_tokens: 4096,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error calling GROQ API:', error);
    throw error;
  }
}; 
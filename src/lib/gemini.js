const GEMINI_API_KEY = process.env.GEMINI_API_KEY

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-lite-latest:generateContent'

export async function getMovieFromMood(mood) {
  if (!GEMINI_API_KEY) {
    throw new Error('Missing Gemini API key. Add GEMINI_API_KEY to your .env file.')
  }

  const prompt = `You are a movie recommendation engine. Based on the mood or feeling below, respond with ONLY the title of one real, well-known movie that fits. No quotes, no explanation, no punctuation besides what's in the title itself - just the title on its own line.

Mood: "${mood}"

Movie title:`

  const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        
        thinkingConfig: { thinkingLevel: 'minimal' },
        maxOutputTokens: 200,
      },
    }),
    cache: 'no-store',
  })

  if (!response.ok) {
    const body = await response.json().catch(() => ({}))
    throw new Error(body.error?.message || 'Gemini request failed.')
  }

  const data = await response.json()
  const candidate = data?.candidates?.[0]
  const text = candidate?.content?.parts?.[0]?.text

  if (!text) {
    if (candidate?.finishReason === 'MAX_TOKENS') {
      throw new Error('Gemini ran out of output tokens before answering. Try again.')
    }
    throw new Error('Gemini did not return a movie title. Try rephrasing your mood.')
  }

  return text.trim().replace(/^["']|["']$/g, '')
}

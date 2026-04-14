/**
 * api.js
 * Handles external API calls (e.g., translation, YouTube, proverb sources).
 */

// 🔑 Paste your keys here
const TRANSLATE_KEY = "AIzaSyAjVe_HmgosxO9lFiNevMlwVgnbN9AiVUA";
const YOUTUBE_KEY = "AIzaSyAjVe_HmgosxO9lFiNevMlwVgnbN9AiVUA";

// Fetch Yoruba proverbs from local JSON
export async function fetchProverbs() {
  const response = await fetch('data/proverbs.json');
  return response.json();
}

// Translation API (Google Cloud Translation)
export async function translateProverb(text, targetLang = 'en') {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${TRANSLATE_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ q: text, target: targetLang })
      }
    );
    const data = await response.json();
    return data.data.translations[0].translatedText;
  } catch (error) {
    console.error("Translation failed:", error);
    return text; // fallback to original
  }
}

// YouTube cultural video search
export async function fetchCulturalVideo(query = "Yoruba proverbs") {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${YOUTUBE_KEY}`
    );
    const data = await response.json();
    return data.items[0]; // return first video result
  } catch (error) {
    console.error("Video fetch failed:", error);
    return null;
  }
}

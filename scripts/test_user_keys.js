import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '..', '.env.local');

// Parsear .env.local manualmente para probar las claves
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const idx = trimmed.indexOf('=');
  if (idx !== -1) {
    const key = trimmed.slice(0, idx).trim();
    const val = trimmed.slice(idx + 1).trim();
    envVars[key] = val;
  }
}

const geminiKey = envVars['VITE_GEMINI_API_KEY'] || envVars['GEMINI_API_KEY'];
const openRouterKey = envVars['VITE_OPENROUTER_API_KEY'] || envVars['OPENROUTER_API_KEY'];

console.log('🔍 Probando conectividad con las claves ingresadas por el usuario...\n');

async function testOpenRouter() {
  console.log('1️⃣ Probando OpenRouter (DeepSeek)...');
  if (!openRouterKey) {
    console.log('❌ No se encontró OPENROUTER_API_KEY');
    return;
  }
  try {
    const res = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openRouterKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://cineplus.local',
        'X-Title': 'CinePlus Test',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-chat',
        messages: [{ role: 'user', content: 'Di "Conexión a DeepSeek exitosa" en 5 palabras.' }],
        max_tokens: 30,
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('✅ OpenRouter / DeepSeek respondió:', data.choices?.[0]?.message?.content);
    } else {
      console.log('⚠️ OpenRouter respondió con código:', res.status, await res.text());
    }
  } catch (err) {
    console.log('❌ Error en OpenRouter:', err.message);
  }
}

async function testGemini() {
  console.log('\n2️⃣ Probando Google Gemini...');
  if (!geminiKey) {
    console.log('❌ No se encontró GEMINI_API_KEY');
    return;
  }
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${encodeURIComponent(geminiKey)}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Di "Conexión a Gemini exitosa" en 5 palabras.' }] }],
        generationConfig: { maxOutputTokens: 30 },
      }),
    });

    if (res.ok) {
      const data = await res.json();
      console.log('✅ Google Gemini respondió:', data.candidates?.[0]?.content?.parts?.[0]?.text);
    } else {
      console.log('⚠️ Google Gemini respondió con código:', res.status, await res.text());
    }
  } catch (err) {
    console.log('❌ Error en Gemini:', err.message);
  }
}

async function main() {
  await testOpenRouter();
  await testGemini();
}

main();

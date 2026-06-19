require('dotenv').config();

const express = require('express');
const path = require('path');

const { GoogleGenerativeAI } = require('@google/generative-ai');

const app = express();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.GEMINI_API_KEY;

if (!API_KEY) {
  console.error('GEMINI_API_KEY is missing.');
}

const genAI = new GoogleGenerativeAI(API_KEY);

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
  try {
    if (!API_KEY) {
      return res.status(500).json({
        error: 'Server is missing GEMINI_API_KEY.'
      });
    }

    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: 'A non-empty messages array is required.'
      });
    }

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash'
    });

    const prompt = `
You are Nimbus, a friendly and clear AI assistant.

Conversation:
${messages.map(m => `${m.role}: ${m.content}`).join('\n')}
`;

    const result = await model.generateContent(prompt);

    const reply = result.response.text();

    res.json({ reply });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: 'Something went wrong calling Gemini.'
    });

  }
});

app.listen(PORT, () => {
  console.log(`Nimbus is running at http://localhost:${PORT}`);
});

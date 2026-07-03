const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

function formatByLevel(text, level = "medium") {
  if (level === "low") {
    return text.split(".").slice(0, 1).join(".") + ".";
  }
  if (level === "high") {
    return text + " If you want, I can give more detail or examples.";
  }
  return text;
}

function generateReply(messages, level = "medium") {
  const lastUser = messages
    .slice()
    .reverse()
    .find((msg) => msg.role === "user")?.content || "";
  const normalized = lastUser.toLowerCase();

  if (!lastUser.trim()) {
    return formatByLevel("Hello! I am Nimbus, your local chatbot. Ask me anything.", level);
  }
  if (normalized.includes("hello") || normalized.includes("hi")) {
    return formatByLevel("Hi there! Nimbus is ready to help.", level);
  }
  if (normalized.includes("how are you")) {
    return formatByLevel("I am doing great. I am running locally without any external API.", level);
  }
  if (normalized.includes("code") || normalized.includes("program") || normalized.includes("javascript") || normalized.includes("python")) {
    return formatByLevel("I can give simple programming guidance, but I am a local demo and not a full AI model.", level);
  }
  if (normalized.includes("bye") || normalized.includes("goodbye")) {
    return formatByLevel("Goodbye! Come back when you want to chat again.", level);
  }

  const reply = `I am running locally without an external API. You asked: \"${lastUser}\".`;
  return formatByLevel(reply, level);
}

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/api/chat", (req, res) => {
  try {
    const { messages, level } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "A non-empty messages array is required.",
      });
    }

    const reply = generateReply(messages, level);
    res.json({ reply });
  } catch (error) {
    console.error("Server Error:", error);

    res.status(500).json({
      error: "Failed to generate a reply.",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Nimbus is running at http://localhost:${PORT}`);
});
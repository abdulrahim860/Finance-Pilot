const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const OLLAMA_API_URL = "http://localhost:11434/api/generate";

// Create a POST endpoint for handling chat requests
app.post("/chat", async (req, res) => {
  // Extract the prompt from the incoming request body
  let { prompt } = req.body;

  // Customize the prompt for financial context
  let customizedPrompt = `You're a financial assistant. The user needs advice on managing their finances. The user asks: "${prompt}"`;

  // Optional: Adjust prompt based on certain keywords to make responses more specific
  if (prompt.toLowerCase().includes("spending") || prompt.toLowerCase().includes("expenses")) {
    customizedPrompt = `You're a financial assistant. The user needs advice on tracking their spending. The user asks: "${prompt}"`;
  } else if (prompt.toLowerCase().includes("save money") || prompt.toLowerCase().includes("budget")) {
    customizedPrompt = `You're a financial assistant. The user is looking for tips on saving money or budgeting. The user asks: "${prompt}"`;
  }

  try {
    // Send the customized prompt to Ollama API
    const response = await axios.post(OLLAMA_API_URL, {
      model: "gemma:2b", // Using gemma:2b model
      prompt: customizedPrompt, // Send the customized financial prompt
    });

    // Return the response back to the frontend
    res.json({ response: response.data.response });
  } catch (error) {
    // Log any errors that occur during the request
    console.error("Error communicating with Ollama:", error);

    // Return an error response to the frontend
    res.status(500).json({ response: "Error getting response from chatbot." });
  }
});

// Specify the port for the server to listen on
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

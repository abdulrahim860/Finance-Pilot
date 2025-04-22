import { auth } from "./firebase.js";
import { signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.getElementById("logout-btn");
  const sendBtn = document.getElementById("send-btn");
  const userInput = document.getElementById("user-input");
  const chatbox = document.getElementById("chatbox");

  // Check user authentication
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html";
    }
  });

  // Logout functionality
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "index.html";
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  });

  // Function to append messages
  function appendMessage(text, isUser = false) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.classList.add(isUser ? "user-message" : "bot-message");
    messageDiv.textContent = text;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  // SmartFinanceBot custom system prompt
  const financePrompt = `
You are SmartFinanceBot, an AI personal finance assistant. 
Your job is to help users:
- Track their expenses
- Analyze their spending
- Provide money-saving tips
- Suggest ways to improve budgeting

Respond as a friendly assistant, and only talk about personal finance topics.

User: `;

  // Send message to Ollama API
  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage(message, true); // Show user message
    userInput.value = "";

    try {
      const response = await fetch("http://localhost:11434/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "gemma:2b",
          prompt: financePrompt + message + "\nSmartFinanceBot:",
          stream: false
        }),
      });

      if (!response.ok) {
        appendMessage("There was an issue with the chatbot. Please try again later.", false);
        return;
      }

      const data = await response.json();
      const reply = data.response.trim();
      appendMessage(reply, false); // Show bot message
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      appendMessage("Unable to connect to Chatbot! Sorry :(", false);
    }
  }

  // Send message on button click
  sendBtn.addEventListener("click", sendMessage);

  // Send message on Enter key press
  userInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") sendMessage();
  });
});

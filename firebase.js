// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// TODO: Replace with your Firebase project config
const firebaseConfig = {
    apiKey: "AIzaSyDoC8sRRBbDsfuVcOOo3cO2-VPhwD_5A3A",
    authDomain: "genai-4028a.firebaseapp.com",
    projectId: "genai-4028a",
    storageBucket: "genai-4028a.firebasestorage.app",
    messagingSenderId: "381601954348",
    appId: "1:381601954348:web:53b192d67e0f79989eaf89",
    measurementId: "G-R8165G1WF2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth instance
export const auth = getAuth(app);

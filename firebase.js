// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

// Replace with your Firebase project config!
const firebaseConfig = {
    apiKey: "Enter_Api_key",
    authDomain: "Enter_auth_domain_link",
    projectId: "Enter_project_id",
    storageBucket: "Enter_Storage_Bucket",
    messagingSenderId: "Enter_message_id",
    appId: "Enter_app_id",
    measurementId: "Enter_measurement_id"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export the auth instance
export const auth = getAuth(app);

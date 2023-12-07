import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyDf7TAM_YlL989gFR9whPHrREbwVUGQ1l4",
    authDomain: "code-explorer-87c68.firebaseapp.com",
    databaseURL: "https://code-explorer-87c68-default-rtdb.firebaseio.com",
    projectId: "code-explorer-87c68",
    storageBucket: "code-explorer-87c68.appspot.com",
    messagingSenderId: "440768541183",
    appId: "1:440768541183:web:2b506bf720495c4a67f7ca",
    measurementId: "G-Z7Q78BXB2L"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();
const auth = getAuth(app);
const newsletterRef = ref(db, 'NewsLetter');

async function handleSignUp() {
    const newsLetterInput = document.getElementById('newsLetter');
    const email = newsLetterInput.value;

    if (isValidEmail(email)) {
        // Check if the email already exists
        const emailExists = await checkEmailExists(email);

        if (!emailExists) {
            // Push the email to the NewsLetter node in the database
            push(newsletterRef, { email })
                .then(() => {
                    alert("Successfully subscribed to the newsletter!");
                    // Clear the input field after successful subscription
                    newsLetterInput.value = '';
                })
                .catch((error) => {
                    console.error("Error subscribing to the newsletter:", error);
                    alert("An error occurred. Please try again later.");
                });
        } else {
            alert("This email is already subscribed.");
        }
    } else {
        alert("Please enter a valid email address.");
    }
}

async function checkEmailExists(email) {
    const snapshot = await get(newsletterRef);
    if (snapshot.exists()) {
        const data = snapshot.val();
        return Object.values(data).some(entry => entry.email === email);
    }
    return false;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

document.querySelector('#newsLetter + button').addEventListener('click', handleSignUp);

// Import the necessary Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";

// Firebase configuration
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();

// Form elements with new IDs
let fnameInput = document.getElementById('fname');
let lnameInput = document.getElementById('lname');
let genderInputs = document.getElementsByName('gender');
let ageInput = document.getElementById('age');
let dobInput = document.getElementById('dob');
let emailInput = document.getElementById('email');
let phoneCodeSelect = document.getElementById('phone-code');
let phoneNumberInput = document.getElementById('phone-number');
let addressTextarea = document.getElementById('address');
let stateSelect = document.getElementById('state');
let pincodeInput = document.getElementById('pincode');
let hobbiesCheckboxes = document.getElementsByName('Hobbies');
let termsCheckbox = document.getElementsByName('check')[0];
let enrollmentForm = document.getElementById('cEnrollment');

// Display custom message
function displaySuccess(message) {
    let preventCopyContainer = document.createElement('div');
    preventCopyContainer.classList.add('prevent-copy-container');

    let preventCopyContent = document.createElement('div');
    preventCopyContent.classList.add('prevent-copy-content');

    let messageElement = document.createElement('p');
    messageElement.textContent = message;

    preventCopyContent.appendChild(messageElement);
    preventCopyContainer.appendChild(preventCopyContent);
    document.body.appendChild(preventCopyContainer);

    // Remove the message after a certain time (e.g., 3 seconds)
    setTimeout(function () {
        document.body.removeChild(preventCopyContainer);
    }, 3000);
}

function textRead(text) {
    if ('speechSynthesis' in window) {
        let speech = new SpeechSynthesisUtterance();
        speech.text = text;
        speech.lang = 'en-US';

        let voices = speechSynthesis.getVoices();
        let femaleVoice = voices.find(function (voice) {
            return voice.name === 'Google UK English Female';
        });

        speech.voice = femaleVoice;

        speechSynthesis.speak(speech);
    }
}

// Function to handle form submission
function handleEnrollmentSubmission(evt) {
    evt.preventDefault();

    // Get form values
    const fname = fnameInput.value;
    const lname = lnameInput.value;
    const gender = getSelectedRadioValue(genderInputs);
    const age = ageInput.value;
    const dob = dobInput.value;
    const email = emailInput.value;
    const phoneCode = phoneCodeSelect.value;
    const phoneNumber = phoneNumberInput.value;
    const address = addressTextarea.value;
    const state = stateSelect.value;
    const pincode = pincodeInput.value;
    const hobbies = getSelectedCheckboxValues(hobbiesCheckboxes);
    // const studentPhoto = studentPhotoInput.value; // You might want to handle file upload separately
    const termsAgreed = termsCheckbox.checked;

    // Check if the form fields are not empty
    if (fname && lname && gender && age && dob && email && phoneCode && phoneNumber && address && state && pincode && hobbies.length > 0  && termsAgreed) {
        // Push form data to the "PyDSAEnrollment" node in the database
        push(ref(db, 'PyDSAEnrollment'), {
            firstName: fname,
            lastName: lname,
            gender: gender,
            age: age,
            dob: dob,
            email: email,
            phone: phoneCode + phoneNumber,
            address: address,
            state: state,
            pincode: pincode,
            hobbies: hobbies,
            // studentPhoto: studentPhoto, // You might want to handle file upload separately
            termsAgreed: termsAgreed
        }).then(() => {
            displaySuccess("Enrollment submitted successfully!");
            textRead("Enrollment submitted successfully!");
            // Clear form fields after successful submission
            enrollmentForm.reset();
        }).catch((error) => {
            console.error("Error submitting the enrollment:", error);
            displaySuccess("An error occurred. Please try again later.");
            textRead("Enrollment submitted successfully!");
        });
    } else {
        displaySuccess("Please fill in all the fields.");
        textRead("Enrollment submitted successfully!");
    }
}

// Helper function to get the value of the selected radio button
function getSelectedRadioValue(radioInputs) {
    for (const radioInput of radioInputs) {
        if (radioInput.checked) {
            return radioInput.value;
        }
    }
    return null;
}

// Helper function to get an array of selected checkbox values
function getSelectedCheckboxValues(checkboxInputs) {
    const selectedValues = [];
    for (const checkboxInput of checkboxInputs) {
        if (checkboxInput.checked) {
            selectedValues.push(checkboxInput.value);
        }
    }
    return selectedValues;
}

// Attach submit event to the enrollment form with the new ID
enrollmentForm.addEventListener('submit', handleEnrollmentSubmission);
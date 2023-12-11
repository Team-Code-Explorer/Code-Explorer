// Disable the "View Source" shortcut
let isCtrlUPressed = false;
let isEscapePressed = false;

document.addEventListener("keydown", function (e) {
    if (e.keyCode === 85) {
        isCtrlUPressed = true;
    } else if (e.keyCode === 27 && isCtrlUPressed) {
        // Prevent the default action
        e.preventDefault();
        // Prevent the event from bubbling up
        e.stopPropagation();
        // Show a message to the user
        alert("Sorry, you cannot view the source code of this page.");
        isCtrlUPressed = false;
    }
});

// Disable right-click context menu
document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
});

// // Custom message when trying to select content
// document.addEventListener('keydown', function (event) {
//     if (event.ctrlKey || event.metaKey) {
//         // Ctrl key (Windows) or Command key (Mac) + C
//         if (event.keyCode === 67) {
//             event.preventDefault();
//             displayCopyMessage();
//         }
//     }
// });

// Preventing keyboard shortcuts
document.addEventListener('keydown', function (event) {
    // Ctrl+U or Command+Option+U (Mac) - View source
    if ((event.ctrlKey || event.metaKey) && (event.keyCode === 85 || event.keyCode === 117)) {
        event.preventDefault();
        displayPreventCopyMessage('Viewing Source Code Is Not Allowed.');
        speakText('Viewing Source Code Is Not Allowed.');
    }

    // Ctrl+Shift+I or Command+Option+I (Mac) - Open developer tools
    if ((event.ctrlKey && event.shiftKey) || (event.metaKey && event.altKey) && (event.keyCode === 73 || event.keyCode === 105)) {
        event.preventDefault();
        displayPreventCopyMessage('Opening Developer Tools Is Not Allowed.');
        speakText('Opening Developer Tools Is Not Allowed.');
    }

    // Ctrl+S or Command+S (Mac) - Save page
    if ((event.ctrlKey || event.metaKey) && (event.keyCode === 83 || event.keyCode === 115)) {
        event.preventDefault();
        displayPreventCopyMessage('Saving The Page Is Not Allowed.');
        speakText('Saving The Page Is Not Allowed.');
    }

    // F12 - Inspect element
    if (event.keyCode === 123) {
        event.preventDefault();
        displayPreventCopyMessage('Inspecting Element Is Not Allowed.');
        speakText('Inspecting Element Is Not Allowed.');
    }

    // // Screenshot Protection
    // if (event.keyCode === 44) {
    //     event.preventDefault();
    //     displayPreventCopyMessage('Taking Screenshot Is Not Allowed.');
    //     speakText('Taking Screenshot Is Not Allowed.');
    // }

    // // Closing the window
    // if ((event.ctrlKey || event.metaKey) && event.keyCode === 87) {
    //     event.preventDefault();
    //     displayPreventCopyMessage('Closing The Tab Is Not Allowed.');
    //     speakText('Closing The Tab Is Not Allowed.');
    // }

    // Custom message when trying to select content
        if (event.ctrlKey || event.metaKey) {
            // Ctrl key (Windows) or Command key (Mac) + C
            if (event.keyCode === 67) {
                event.preventDefault();
                displayCopyMessage();
            }
        }

        // Reload
        if ((event.ctrlKey || event.metaKey) && event.keyCode === 82) {
            event.preventDefault();
            displayPreventCopyMessage('Reloaded by mistake?');
            speakText('If you wish to reload, please use the reload icon.');
        }

    });

    // Disable text selection
    // document.addEventListener('selectstart', function (event) {
    //     event.preventDefault();
    //     displayPreventCopyMessage('Selecting Text Is Not Allowed.');
    //     speakText('Selecting Text Is Not Allowed.');
    // });

    // Disable image drag-and-drop
    document.addEventListener('dragstart', function (event) {
        event.preventDefault();
        displayPreventCopyMessage('Dragging Is Not Allowed.');
        speakText('Dragging Is Not Allowed.');
    });

    // // Prevent page reload
    // window.addEventListener('beforeunload', function (event) {
    //     // Display a confirmation message (optional)
    //     event.returnValue = 'Are you sure you want to leave?';
    //     // Alternatively, you can use the following line without a confirmation message:
    //     // event.preventDefault();
    // });


    // Display custom message
    function displayCopyMessage() {
        let copyMessage = document.createElement('div');
        copyMessage.classList.add('copy-message');

        let copyMessageContent = document.createElement('div');
        copyMessageContent.classList.add('copy-message-content');

        let icon = document.createElement('i');
        icon.classList.add('fas', 'fa-exclamation-circle');

        let message = document.createElement('p');
        message.textContent = 'You Cannot Copy Anything From Here.';

        copyMessageContent.appendChild(icon);
        copyMessageContent.appendChild(message);
        copyMessage.appendChild(copyMessageContent);
        document.body.appendChild(copyMessage);

        // Remove the message after a certain time (e.g., 3 seconds)
        setTimeout(function () {
            document.body.removeChild(copyMessage);
        }, 3000);

        // Speak the message aloud
        speakText('You Cannot Copy Anything From Here.');
    }

    // Speak text using the Web Speech API
    function speakText(text) {
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

    // Display custom message
    function displayPreventCopyMessage(message) {
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

    // Alert message on Enter key press
    document.addEventListener('keypress', function (event) {
        // Enter key - Prevent default behavior and display the alert message
        if (event.keyCode === 13) {
            event.preventDefault();
            displayPreventCopyMessage("You Can't Hit The Enter Button.");
            speakText("You Can't Hit The Enter Button.");
        }
    });

    // Prevent "view-source" URL from opening on form submission
    document.addEventListener('submit', function (event) {
        let formElement = event.target;
        let targetUrl = formElement.getAttribute('action') || formElement.action;
        let viewSourceUrlPattern = /view-source:/i;

        if (viewSourceUrlPattern.test(targetUrl)) {
            event.preventDefault();
            displayPreventCopyMessage('Viewing Source Code Is Not Allowed.');
            speakText('Viewing Source Code Is Not Allowed.');
        }
    });
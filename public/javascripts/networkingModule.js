// /public/javascripts/networkingModule.js

document.addEventListener('DOMContentLoaded', function () {
    // Fetch and render lab content
    fetchLabContent();

    // Setup spawn Kali instance button
    setupSpawnKaliButton();

    // Setup terminate Kali instance button
    setupTerminateKaliButton();
});

function fetchLabContent() {
    // Make authenticated request with the token cookie
    fetch('http://localhost:3000/api/v1/lab/networkingLab', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${getCookie('token')}`
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to fetch lab content: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // Update the content in the 'lab-content' div
        document.getElementById('lab-content').innerHTML = data.labContent.content;
    })
    .catch(error => console.error('Error fetching lab content:', error));
}

function setupSpawnKaliButton() {
    // Add event listener to the spawn Kali instance button
    const spawnKaliButton = document.getElementById('spawnKaliButton');
    spawnKaliButton.addEventListener('click', handleSpawnKali);
}

function handleSpawnKali() {
    // Make authenticated request to spawn Kali instance
    fetch('http://localhost:3000/api/v1/kalispawn', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${getCookie('token')}`
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to spawn Kali instance: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // Show loading message with progress bar
        showAlertWithProgressBar('Loading your Kali instance...', 120, () => {
            // After the progress, open the link in a new tab
            window.open(data.link, '_blank');
        });
    })
    .catch(error => console.error('Error spawning Kali instance:', error));
}

function setupTerminateKaliButton() {
    // Add event listener to the terminate Kali instance button
    const terminateKaliButton = document.getElementById('terminateKaliButton');
    terminateKaliButton.addEventListener('click', handleTerminateKali);
}

function handleTerminateKali() {
    // Make authenticated request to terminate Kali instance
    fetch('http://localhost:3000/api/v1/killinstance', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Cookie': `token=${getCookie('token')}`
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Failed to terminate Kali instance: ${response.statusText}`);
        }
        return response.json();
    })
    .then(data => {
        // Show alert with termination message
        showAlert(`Instance terminated successfully. Instance ID: ${data.terminatedInstanceId}`);
    })
    .catch(error => console.error('Error terminating Kali instance:', error));
}

function showAlertWithProgressBar(message, durationInSeconds, onComplete) {
    // Create an alert element with progress bar
    const alertElement = document.createElement('div');
    alertElement.className = 'alert';
    alertElement.textContent = message;

    // Create a progress bar element
    const progressBarElement = document.createElement('div');
    progressBarElement.className = 'progress-bar';
    progressBarElement.role = 'progressbar';
    progressBarElement.style.width = '0%';

    // Append the progress bar to the alert
    alertElement.appendChild(progressBarElement);

    // Append the alert to the alert container
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = ''; // Clear previous alerts
    alertContainer.appendChild(alertElement);

    // Start simulating the progress bar
    simulateProgressBar(progressBarElement, durationInSeconds, onComplete);
}

function hideAlert() {
    // Clear the alert container
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = '';
}

function simulateProgressBar(progressBarElement, durationInSeconds, onComplete) {
    progressBarElement.style.width = '0%';

    let progress = 0;

    const intervalId = setInterval(() => {
        progress += (100 / durationInSeconds);
        progressBarElement.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(intervalId);
            progressBarElement.style.width = '100%'; // Corrected line
            // Hide loading message
            hideAlert();
            onComplete();
        }
    }, 1000);
}

function showAlert(message) {
    // Create an alert element
    const alertElement = document.createElement('div');
    alertElement.className = 'alert';
    alertElement.textContent = message;

    // Append the alert to the alert container
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = ''; // Clear previous alerts
    alertContainer.appendChild(alertElement);
}

// Helper function to get cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

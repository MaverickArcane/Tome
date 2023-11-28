document.addEventListener('DOMContentLoaded', function () {
    // Fetch and render lab content
    fetchLabContent();

    // Setup WebSocket terminal
    setupWebSocketTerminal();
});

function fetchLabContent() {
    // Make authenticated request with the token cookie
    fetch('http://localhost:3000/api/v1/lab/linuxLearningLab', {
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

function setupWebSocketTerminal() {
    // Use xterm.js library to create a terminal
    const term = new Terminal();
    term.open(document.getElementById('xterm-container'));

    const socket = new WebSocket('ws://192.168.0.226:6060');

    socket.addEventListener('message', function (event) {
        term.write(event.data);
    });

    term.onData(data => {
        socket.send(data);
    });

    socket.addEventListener('close', function (event) {
        if (event.wasClean) {
            console.log(`Connection closed cleanly, code=${event.code}, reason=${event.reason}`);
        } else {
            console.error('Connection died');
        }
    });

    socket.addEventListener('error', function (error) {
        console.error(`WebSocket Error: ${error}`);
    });
}

// Helper function to get cookie value by name
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

// 🌟🌟🌟 REQUIRE NECESSARY MODULES 🌟🌟🌟
// 🚀 We need the 'http' module to create the server
const http = require('http');
const fs = require('fs');
const path = require('path');


// 🧑‍🎨🧑‍🎨🧑‍🎨 FUNCTION TO SERVE HTML CONTENT 🧑‍🎨🧑‍🎨🧑‍🎨
const serveHTML = (res) => {
    const htmlContent = `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Timer</title>
        <style>
            /* 🌟 Global Styling 🌟 */
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #282c34;
                color: white;
            }

            /* 🌟 Timer Container Styling 🌟 */
            .timer-container {
                text-align: center;
                background: #444;
                padding: 20px 40px;
                border-radius: 8px;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
            }

            /* 🌟 Timer Display Styling 🌟 */
            .timer {
                font-size: 4rem;
                font-weight: bold;
                margin-bottom: 20px;
            }

            /* 🌟 Buttons Styling 🌟 */
            .controls button {
                margin: 0 10px;
                padding: 10px 20px;
                font-size: 1rem;
                color: white;
                background-color: #007bff;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            .controls button:hover {
                background-color: #0056b3;
            }

            .controls button:disabled {
                background-color: #555;
                cursor: not-allowed;
            }
        </style>
    </head>
    <body>
        <div class="timer-container">
            <div id="timer" class="timer">05:00</div>
            <div class="controls">
                <button id="start">Start</button>
                <button id="pause">Pause</button>
                <button id="reset">Reset</button>
            </div>
        </div>
        <script>
            let timerInterval;
            let remainingTime = 300; // Timer starts from 5 minutes (300 seconds)

            const timerDisplay = document.getElementById('timer');
            const startButton = document.getElementById('start');
            const pauseButton = document.getElementById('pause');
            const resetButton = document.getElementById('reset');

            function formatTime(seconds) {
                const minutes = String(Math.floor(seconds / 60)).padStart(2, '0');
                const secs = String(seconds % 60).padStart(2, '0');
                return \`\${minutes}:\${secs}\`;
            }

            function updateTimerDisplay() {
                timerDisplay.textContent = formatTime(remainingTime);
            }

            function startTimer() {
                if (!timerInterval) {
                    timerInterval = setInterval(() => {
                        if (remainingTime > 0) {
                            remainingTime--;
                            updateTimerDisplay();
                        } else {
                            clearInterval(timerInterval);
                            timerInterval = null;
                        }
                    }, 1000);
                }
            }

            function pauseTimer() {
                clearInterval(timerInterval);
                timerInterval = null;
            }

            function resetTimer() {
                clearInterval(timerInterval);
                timerInterval = null;
                remainingTime = 300;
                updateTimerDisplay();
            }

            startButton.addEventListener('click', startTimer);
            pauseButton.addEventListener('click', pauseTimer);
            resetButton.addEventListener('click', resetTimer);

            // Initialize the display
            updateTimerDisplay();
        </script>
    </body>
    </html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
};


// 🌐🌐🌐 CREATE THE HTTP SERVER 🌐🌐🌐
const server = http.createServer((req, res) => {
    // 🌍 Serve the Timer HTML
    if (req.method === 'GET' && req.url === '/') {
        serveHTML(res);
    } else {
        // ❌ Handle unknown paths with a 404 error
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});


// ⚡⚡⚡ START THE SERVER ⚡⚡⚡
const PORT = process.env.PORT || 3000; // 🌟 Use PORT variable or default to 3000
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

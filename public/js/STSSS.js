// 🌟🌟🌟 REQUIRE NECESSARY MODULES 🌟🌟🌟
// 🚀 We need the 'http' module to create the server
const http = require('http');


// 🧑‍🎨🧑‍🎨🧑‍🎨 FUNCTION TO SERVE HTML CONTENT 🧑‍🎨🧑‍🎨🧑‍🎨
const serveHTML = (res) => {
    const htmlContent = `
    <!doctype html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Stopwatch</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
    </head>
    <body class="bg-gray-900 text-white font-sans flex items-center justify-center h-screen">
        <div class="text-center">
            <h1 class="text-4xl font-bold mb-6">Stopwatch ⏱</h1>
            <div id="timer" class="text-6xl font-mono mb-6">00:00:00</div>
            <div class="space-x-4">
                <button id="start" class="bg-green-500 text-white px-4 py-2 rounded shadow">Start</button>
                <button id="stop" class="bg-red-500 text-white px-4 py-2 rounded shadow">Stop</button>
                <button id="reset" class="bg-blue-500 text-white px-4 py-2 rounded shadow">Reset</button>
            </div>
        </div>
        <script>
            let timerInterval;
            let elapsedTime = 0;

            const timerDisplay = document.getElementById('timer');
            const startButton = document.getElementById('start');
            const stopButton = document.getElementById('stop');
            const resetButton = document.getElementById('reset');

            function formatTime(ms) {
                const totalSeconds = Math.floor(ms / 1000);
                const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
                const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
                const seconds = String(totalSeconds % 60).padStart(2, '0');
                return \`\${hours}:\${minutes}:\${seconds}\`;
            }

            function updateTimerDisplay() {
                timerDisplay.textContent = formatTime(elapsedTime);
            }

            startButton.addEventListener('click', () => {
                if (!timerInterval) {
                    const startTime = Date.now() - elapsedTime;
                    timerInterval = setInterval(() => {
                        elapsedTime = Date.now() - startTime;
                        updateTimerDisplay();
                    }, 100);
                }
            });

            stopButton.addEventListener('click', () => {
                clearInterval(timerInterval);
                timerInterval = null;
            });

            resetButton.addEventListener('click', () => {
                clearInterval(timerInterval);
                timerInterval = null;
                elapsedTime = 0;
                updateTimerDisplay();
            });

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
    // 🌍 Handle root URL ('/') requests
    if (req.method === 'GET' && req.url === '/') {
        serveHTML(res); // Serve the stopwatch page
    } else {
        // ❌ Handle unknown paths with a 404 error
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});


// ⚡⚡⚡ START THE SERVER ⚡⚡⚡
const PORT = process.env.PORT || 3000; // 🌟 Use the 'PORT' environment variable or default to 3000
server.listen(PORT, () => {
    // 🎉 Log the server is running
    console.log(`Server is running on http://localhost:${PORT}`);
});

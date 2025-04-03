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
        <title>Age Calculator</title>
        <style>
            /* 🌟 Global Styling 🌟 */
            body {
                margin: 0;
                font-family: Arial, sans-serif;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f4f4f9;
                color: #333;
            }

            /* 🌟 Calculator Container Styling 🌟 */
            .calculator {
                background: #fff;
                padding: 30px 40px;
                border-radius: 10px;
                box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
                text-align: center;
            }

            /* 🌟 Title Styling 🌟 */
            h1 {
                font-size: 24px;
                margin-bottom: 20px;
                color: #4a90e2;
            }

            /* 🌟 Input and Button Styling 🌟 */
            input[type="date"] {
                padding: 10px;
                font-size: 16px;
                width: calc(100% - 22px);
                margin-bottom: 20px;
                border: 1px solid #ddd;
                border-radius: 5px;
                box-sizing: border-box;
            }

            button {
                padding: 10px 20px;
                font-size: 16px;
                color: white;
                background-color: #4a90e2;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background-color 0.3s ease;
            }

            button:hover {
                background-color: #357abd;
            }

            /* 🌟 Result Styling 🌟 */
            .result {
                margin-top: 20px;
                font-size: 18px;
                color: #555;
            }
        </style>
    </head>
    <body>
        <div class="calculator">
            <h1>Age Calculator 🎂</h1>
            <input type="date" id="birthDate" />
            <button id="calculate">Calculate Age</button>
            <div id="result" class="result"></div>
        </div>
        <script>
            const calculateButton = document.getElementById('calculate');
            const resultDiv = document.getElementById('result');

            calculateButton.addEventListener('click', () => {
                const birthDate = document.getElementById('birthDate').value;
                
                if (!birthDate) {
                    resultDiv.textContent = "Please select a valid date.";
                    return;
                }

                const today = new Date();
                const birth = new Date(birthDate);

                let age = today.getFullYear() - birth.getFullYear();
                const monthDiff = today.getMonth() - birth.getMonth();
                const dayDiff = today.getDate() - birth.getDate();

                // Adjust age if the birthday hasn't occurred yet this year
                if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
                    age--;
                }

                resultDiv.textContent = \`You are \${age} years old.\`;
            });
        </script>
    </body>
    </html>
    `;

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlContent);
};

// 🌐🌐🌐 CREATE THE HTTP SERVER 🌐🌐🌐
const server = http.createServer((req, res) => {
    // 🌍 Serve the Age Calculator HTML
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

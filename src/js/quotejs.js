const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Ensure this is installed: npm install node-fetch
const app = express();
const PORT = 5000;

app.use(cors({
    origin: '*',
}));

app.get('/quote', async (req, res) => {
    try {
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        res.json({ quoteText: data.content, quoteAuthor: data.author });
    } catch (error) {
        console.error('Error fetching the quote:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
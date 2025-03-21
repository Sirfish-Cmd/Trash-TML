const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let players = [];
let currentPlayerIndex = 0;

// Serve the frontend files
app.use(express.static('public'));

// Handle player connections
io.on('connection', (socket) => {
    console.log('A player connected:', socket.id);

    if (players.length < 6) {
        players.push({ id: socket.id, name: `Player ${players.length + 1}` });
        socket.emit('welcome', { players, playerId: socket.id });
    } else {
        socket.emit('full', { message: 'Game room is full!' });
    }

    // Broadcast moves
    socket.on('move', (data) => {
        io.emit('update-move', data);
    });

    // Disconnect event
    socket.on('disconnect', () => {
        console.log('Player disconnected:', socket.id);
        players = players.filter(player => player.id !== socket.id);
    });
});

// Start the server
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

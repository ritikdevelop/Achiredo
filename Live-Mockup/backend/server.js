const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const { initializeData, updateData, getCurrentData } = require('./dataGenerator');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// API endpoint for data (fallback/polling)
app.get('/api/data', (req, res) => {
  res.json(getCurrentData());
});

initializeData();

// Simulate physical devices updating every 1 second
setInterval(() => {
  updateData();
  const data = getCurrentData();
  // Broadcast to all connected clients (real-time)
  io.emit('dataUpdate', data);
}, 1000);

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Workshop Backend running on http://localhost:${PORT}`);
  console.log(`API: http://localhost:${PORT}/api/data`);
  console.log('Socket.io real-time updates active');
});


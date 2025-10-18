require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { createServer } = require('http');
const { Server } = require('socket.io');
const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"]
}));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

// Middleware
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// WebSocket Handling
io.on('connection', (socket) => {
  console.log('🟢 New WebSocket Client Connected:', socket.id);

  // Join room for news category
  socket.on('subscribeToCategory', (category) => {
    console.log(`Client subscribed to category: ${category}`);
    socket.join(category);
  });

  socket.on('disconnect', () => console.log('🔴 Client Disconnected:', socket.id));
});

// Function to Send News Updates
const sendNewsUpdate = (category, newArticle) => {
  io.to(category).emit("newsUpdate", newArticle);
};

// Test API Route
app.get('/', (req, res) => res.send('✅ API Running'));

// Routes
const newsRoutes = require('./routes/news.js');
app.use('/api/news', newsRoutes);

// Start Server
const PORT = 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const setupSwagger = require("./swagger");
setupSwagger(app);

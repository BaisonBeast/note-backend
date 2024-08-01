import connectDB from "./config/db.js";
import express from "express";
import dotenv from "dotenv";
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import MessageRoutes from './routes/Message.js';
import GroupRoutes from './routes/Group.js';

dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.API_URL,
    methods: ['GET', 'POST']
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use('/api/messages', MessageRoutes);
app.use('/api/group', GroupRoutes);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('joinGroup', (groupId) => {
    socket.join(groupId);
    console.log(`User joined group: ${groupId}`);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

io.engine.on("connection_error", (err) => {
  console.log(err.req);      
  console.log(err.code);     
  console.log(err.message);  
  console.log(err.context);  
});

app.get('/', function(req, res) {
  res.send('Hello')
})

server.listen(PORT, () => {
    console.log(
        `Server Running on port ${PORT}`
    );
});
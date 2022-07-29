import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import messagesRoutes from './routes/messagesRoute.js';
import { Server } from 'socket.io';

const app = express();
dotenv.config();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => {
    console.log('DB Connetion Successfull');
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use('/api/auth', userRoutes);
app.use('/api/messages', messagesRoutes);
app.get('/', (req, res) => {
  res.send('APP IS RUNNING.');
});

const server = app.listen(PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.msg);
    }
  });
});

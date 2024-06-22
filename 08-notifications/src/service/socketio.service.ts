import app from '../app';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

const server = createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', (socket) => {
  console.log(`a user connected ${socket.id}`);

  socket.on('message', (data) => {
    console.log(`message received , ${data}`);
  });

  socket.on('disconnect', () => {
    console.log('socket connection disconnected');
  });

  socket.emit('message', `New client connected ${socket.id}`);

});

export { server };
export { io };

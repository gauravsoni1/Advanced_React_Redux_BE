import app from '../app';
import { Server } from 'socket.io';
import { createServer } from 'node:http';

// Stocks - Events
// Support - Events

const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on('connection', (socket) => {
    console.log("Conection establied");

    socket.on('message', (data) => {
        console.log("Message recevied", data);
    })

    socket.on("disconnect", () => {
        console.log("Socket connection disconnected");
    });

    socket.on("stock", (data) => {
        console.log("Stock event recevied", data);
    })

    socket.on("support", (data) => {
        console.log("Support chat event recevied", data);
    })

    // setInterval(() => {
    //     socket.emit("notification", "Hey this is a notification being sent");
    // }, 3000)
});

export { server };
export { io }
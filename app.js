const express = require("express");
const http = require("http")
const app = express();
const path = require("path");
const server = http.createServer(app);
const socketIo = require("socket.io");


const io = socketIo(server);

app.use(express.static(path.join(__dirname,"src")));
const PORT =  3000;



io.on("connection",(socket) => {
    socket.on("chatting",(data) => {
        io.emit("chatting",data)
    })
})

server.listen(PORT, ()=>console.log(`server is running ${PORT}`));
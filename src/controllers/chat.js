var express = require('express');
var socket = require('socket.io');

const { pool } = require("./pool_connection");
const Pool = require("pg").Pool;

var app=express();
var server = app.listen(4000,() => {
    console.log("Server is running on port 4000");
});

// static files
app.use(express.static('public'));

// socket io setup
var io = socket(server);

io.on('connection', (socket) => {
    console.log('made socket connection',socket.id);

    // Handle chat event
    socket.on('chat',(data) => {
        io.sockets.emit('chat',data);
    }); 
    
    // Handle typing event
    socket.on('typing',(data)=> {
        socket.broadcast.emit('typing', data);
    });

});

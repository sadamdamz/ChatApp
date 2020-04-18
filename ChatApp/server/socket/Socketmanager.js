const mongoose = require('mongoose')
const jwt_decode = require("jwt-decode");
const privateUsers = [];

module.exports = function(socket){

    socket.on('fromUser',(from)=>{
        const userId = jwt_decode(from);
        console.log(userId)
    })

    socket.on('message',(message)=>{
        socket.emit('messages',message);
    })
    socket.on('clickedUser',(to)=>{
        console.log(to)
    })
}
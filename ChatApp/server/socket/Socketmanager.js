const io = require('../app').io;
const jwt_decode = require("jwt-decode");
const privateUsers = [];

module.exports = function(socket){

    const Chat = require('../models/Chat');

    socket.on('fromUser',(from)=>{
        const userIds = jwt_decode(from);
        const userId = userIds.userId
        privateUsers[userId] = socket.id;
        io.emit('userConnected',userId)
    })

    socket.on('message',(message)=>{
        var chats = message.message;
        socket.emit('chats',chats)
    })
    socket.on('clickedUser',(to)=>{
    })

    socket.on('sendMessage',(sender,reciever,Message)=>{
        var chat = new Chat({
            from:sender,
            to:reciever,
            message:Message
        })
        chat.save((err,data)=>{
            if(err){
                console.log(err)
            }else{
                console.log('chat saved sucesss'+data);
                var socketId = privateUsers[data.reciever];
                socket.emit('recieveMessage',(data))
            }
        })
    })
}
const io = require('../app').io;
const jwt_decode = require("jwt-decode");
const privateUsers = [];

module.exports = function(socket){

    const Chat = require('../models/Chat');

    socket.on('fromUser',(from)=>{
        const userIds = jwt_decode(from);
        const userId = userIds.userId
        privateUsers[userId] = socket.id;
        socket.emit('sendSocketid',privateUsers[userId]);
        console.log('user connected'+ ' ' +privateUsers[userId])
    })

    socket.on('sendMessage',async(sender,reciever,Message)=>{
        var user = privateUsers[reciever]
        var data = {
            from:sender,
            to:reciever,
            message:Message
        }
        var chat = new Chat({
            from:sender,
            to:reciever,
            message:Message
        })
        try{
            var chats = await chat.save();
            socket.emit('recieveMessage',chats);
            io.to(user).emit('newmessages',chats);
        }catch(err){
            console.log(err);
        }
    })
}
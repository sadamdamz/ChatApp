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

    socket.on('sendMessage',(sender,reciever,Message)=>{
        var user = privateUsers[reciever]
        console.log(user);
        var data = {
            from:sender,
            to:reciever,
            message:Message
        }
        io.to(user).emit('newmessages',(data));
        var chat = new Chat({
            from:sender,
            to:reciever,
            message:Message
        })
        chat.save((err,data)=>{
            if(err){
                console.log(err)
            }else{
                socket.emit('recieveMessage',(data))
            }
        })
    })
}
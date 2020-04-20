const mongoose = require('mongoose');
var timestamps = require('mongoose-timestamp');
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
    from:{
        type:String
    },
    to:{
        type:String
    },
    message:{
        type:String
    }
})

ChatSchema.plugin(timestamps);

module.exports = Chat = mongoose.model('chats', ChatSchema)
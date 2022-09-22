const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    senderId:{
        type:mongoose.Types.ObjectId,
        requite:true,
    },
    receiverId:{
        type:mongoose.Types.ObjectId,
        require:true
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User" 
    },
    message:String,
    seenStatus:{
        type:Boolean,
        default:false
    },
    time:{
        type:Date,
        default: ()=> { return new Date() }
    }

});

const Chat = mongoose.model("Chat", ChatSchema);

module.exports = Chat;
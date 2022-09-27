const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    description:{
        type:String,
    },
    date:{
        type:Date,
        default:() => { return new Date()}
    }

});


const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
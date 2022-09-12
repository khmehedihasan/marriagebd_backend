const mongoose = require('mongoose');

const unverifiedSchema = mongoose.Schema({
    data:Object,
    verificationCode:String,
    verificationStatus:{
        type:String,
        default:false
    },
    userId:mongoose.Types.ObjectId,
    date:{
        type:Date,
        default:() => { return new Date()}
    }

});

const Unverified = mongoose.model("Unverified", unverifiedSchema);

module.exports = Unverified;
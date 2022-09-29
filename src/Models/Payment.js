const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:"User"
    },
    packag:{
        type:String,
        require:true
    },
    trxId:{
        type:String,
        require:true
    },
    date:{
        type:Date,
        default: ()=> { return new Date() }
    }

});

const Payment = mongoose.model("Payment", PaymentSchema);

module.exports = Payment;
require('dotenv').config();

const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email.');
            }
        }
    },
    phone:{
        type:String,
        require:true,
        unique:true,
    },
    img:{
        type:String,

    },
    photo:{
        type:String,
    },
    date:{
        type:Date,
        default:() => { return new Date()}
    },
    password:{
        type:String,
        require:true
    },
    token:{
        type:String,
        require:true,
    }

});

adminSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password,parseInt(process.env.BCRYPT_LOOP));
    next();
});

adminSchema.methods.createToken = async function(){
    try{
        this.token = jwt.sign({_id:this.id},process.env.JWT_SEC,{expiresIn:process.env.JWT_EXP});
    }catch(error){
        console.log(error)
    }
};


const Admin = new mongoose.model('Admin',adminSchema);

module.exports = Admin;


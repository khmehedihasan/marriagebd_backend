const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    uid:{
        type:String,
        require:true,
    },
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    phone:{
        type:String,
        reqire:true,
        unique:true 
    },
    candidateName:{
        type:String,
        require:true
    },
    birthDate:{
        type:Date,
        require:true
    },
    religion:{
        type:String,
        require:true,
    },
    maritalStatus:{
        type:String,
        require:true
    },
    nationality:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    educationDetails:String,
    workingSector:{
        type:String,
        require:true
    },
    educationQualification:{
        type:String,
        require:true
    },
    professionDetails:{
        type:String,
        require:true 
    },
    profession:{
        type:String,
        require:true 
    },
    incame:{
        type:String,
        require:true 
    },
    homeDivision:{
        type:String,
        require:true 
    },
    fatherStatus:{
        type:String,
        require:true 
    },
    familyDetails:String,
    livingIn:{
        type:String,
        require:true 
    },
    fatherOccupation:String,
    motherStatus:{
        type:String,
        require:true 
    },
    motherOccupation:String,
    livingCity:{
        type:String,
        require:true 
    },
    marriedBrother:{
        type:String,
        require:true 
    },
    unMarriedBrother:{
        type:String,
        require:true  
    },
    marriedSister:{
        type:String,
        require:true  
    },
    unMarriedSister:{
        type:String,
        require:true 
    },
    physicalDetails:String,
    weight:{
        type:Number,
        require:true 
    },
    height:{
        type:Number,
        requite:true 
    },
    blood:String,
    bodyType:{
        type:String,
        require:true 
    },
    complexion:{
        type:String,
        require:true 
    },
    smoke:{
        type:String,
        requite:true 
    },
    religiousValue:{
        type:String,
        require:true 
    },
    familyVale:{
        type:String,
        require:true 
    },
    diet:{
        type:String,
        require:true 
    },
    aboutSelf:{
        type:String,
        requite:true,
    },
    img:{
        type:String,

    },
    photo:{
        type:String,
    },
    verificationCode:String,
    token:{
        type:String,
        require:true 
    },
    password:{
        type:String,
        require:true 
    },
    date:{
        type:Date,
        default: ()=> { return new Date() }
    }

    
});


userSchema.pre('save', async function(next){
    this.password = await bcrypt.hash(this.password, parseInt(process.env.BCRYPT_LOOP));
    next();
});

userSchema.methods.createToken = async function(){
    try{
         this.token = await jwt.sign({_id:this.id}, process.env.JWT_SEC, {expiresIn:process.env.JWT_EXP});
    }catch(error){
        console.log(error);
    }
}

const User = mongoose.model("User", userSchema);

module.exports = User;
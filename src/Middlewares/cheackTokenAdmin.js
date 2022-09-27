require('dotenv').config();
const jwt = require('jsonwebtoken');
const Admin = require('../Models/Admin');
const cheackTokenAdmin = async (req,res,next)=>{
    try{

        if(req.signedCookies){
            const token = req.signedCookies.token;
            const data = await Admin.find({token});
            const varifiedToken = await jwt.verify(token,process.env.JWT_SEC);
            
           
            if(data.length>0 && varifiedToken){
                next();
            }
            else{
                res.status(401).send({status:false,message:'Authentication failed.',login:false});
            }
    
        }
        else{
            res.status(401).send({status:false,message:'Authentication failed.',login:false});
        }
        

    }catch(error){
        res.status(401).send({status:false,message:'Authentication failed.',login:false});
    }

}

module.exports = cheackTokenAdmin;
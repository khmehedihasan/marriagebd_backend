const User = require('../Models/User');
//--------------------------------------------logout User----------------------------------------------------------


logOut = async (req,res,next)=>{
    try{
        
        const data = await User.findByIdAndUpdate(req.params.id,{$set:{token:''}},{new:true});
        
        res.clearCookie('auth');
        res.clearCookie('token');
        res.send({status:true,message:'Logout successfully.',login:false});

    }catch(error){
        next(error);
    }
}

module.exports = logOut;
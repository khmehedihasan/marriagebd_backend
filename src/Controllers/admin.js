require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../Models/Admin')

// -------------add Admin-----------------------------------------------------------------------

exports.addAdmin = async (req,res,next)=>{

    try{

        const admin = await Admin({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            password:req.body.password
        });

        await admin.createToken();

        const data = await admin.save();

        res.send({status:true, message:"Admin added successfully."});




    }catch(error){
        if(error.code){
            if(error.keyPattern.phone){
                res.status(400).send({status:false,message:"Phone number already present.",login:false});
            }
            else{
                res.status(400).send({status:false,message:"Email already present.",login:false});
            }
        }
        else{
            next(error);
        }
    }
}


// ------------------------------------------------get all Admin---------------------------------------


exports.getAllAdmin = async (req,res,next) =>{
    try{

        const data = await Admin.find().select({__v:0,password:0,token:0});


        if(data.length > 0){

            res.json(data);

        }else{

            res.status(400).send({status:false,message:'Admin not found.'});
            
        }

    }catch(error){
        next(error)
    }
}

//------------------------------------------------------------- all Admin------------------------------------------------



exports.allAdmin = async (req,res,next)=>{
    try{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page-1) * limit;
        const result = {};
        result.totalData = await Admin.countDocuments();
        result.data = []


        if(limit == 0){
            result.totalPage = 1;
        }else{
            result.totalPage = Math.ceil(await Admin.countDocuments()/limit);
        }

        result.previous = {
            page: page-1,
            limit
        }
        if(page == result.totalPage){
            result.next = {
                page: 0,
                limit
            }    
        }

        else{
            result.next = {
                page: page+1,
                limit
            }
        }

        result.data = await Admin.find().limit(limit).skip(skip).sort({date: -1}).select({__v:0,password:0,token:0});
        
        if(result.totalData<1){
            res.status(404).send({status:false,message:"Admin not found."});
        }else{
            res.json({status:true,result});
        }
    }catch(error){
        next(error);
    }
}



//---------------------------------------------------search Admin--------------------------------------------------------

exports.searchAdmin = async (req,res,next)=>{
    try{


        const dcount = await Admin.find({"$or":[
            {name: { $regex: req.query.search, $options: 'i' } },
            {email: { $regex: req.query.search, $options: 'i' } },
            {phone: { $regex: req.query.search, $options: 'i' } },
        ]}).count();

        if(dcount<1){
            res.status(400).send({status:false,message:"Admin not found."});
        }else{
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const skip = (page-1) * limit;
            const result = {};
            result.data = []

            result.data = await Admin.find({"$or":[
                {name: { $regex: req.query.search, $options: 'i' } },
                {email: { $regex: req.query.search, $options: 'i' } },
                {phone: { $regex: req.query.search, $options: 'i' } },
            ]}).select({__v:0}).limit(limit).skip(skip).sort({date: -1}).select({__v:0,password:0,token:0});

            result.totalData = dcount;

            if(limit == 0){
                result.totalPage = 1;
            }else{
                result.totalPage = Math.ceil(dcount/limit);
            }

            result.previous = {
                page: page-1,
                limit
            }
    
            if(page == result.totalPage){
                result.next = {
                    page: 0,
                    limit
                }    
            }else{
                result.next = {
                    page: page+1,
                    limit
                }
            }

            res.json({status:true,result});
        }

    }catch(error){
        next(error);
    }
}




//--------------------------------------------loin Admin----------------------------------------------------------


exports.loginAdmin = async (req,res,next)=>{
    
    try{

        const admin = await Admin.find({email:req.body.email});
       

        if(admin.length > 0){

            const isAdmin = await bcrypt.compare(req.body.password, admin[0].password);
            if(isAdmin){

                const token = await jwt.sign({_id:admin[0].id},process.env.JWT_SEC,{expiresIn:process.env.JWT_EXP});
                const data = await Admin.findByIdAndUpdate(admin[0]._id,{token:token},{new:true});

                res.cookie('token',data.token,{expires: new Date(Date.now() + parseInt(process.env.COOKIEEXP)),httpOnly:true, secure:true, signed:true, secret:process.env.COOKIESEC,sameSite:"none" });

                // res.cookie('auth','kfjk5kjksdwk23klskj90fj234i209sfj9u4iwej',{expires: new Date(Date.now() + parseInt(process.env.COOKIEEXP)) });

                res.json({status:true,message:'Login successfully.',login:true});

            }else{
                res.status(401).send({status:false,message:'Authentication failed.',login:false})
            }

        }else{
            res.status(401).send({status:false,message:'Authentication failed.',login:false})
        }

    }catch(error){
        next(error);
    }
}

//--------------------------------------------logout Admin----------------------------------------------------------


exports.logoutAdmin = async (req,res,next)=>{
    
    try{

        const data = await Admin.findByIdAndUpdate(req.params.id,{$set:{token:''}},{new:true});

        res.clearCookie('token');
        res.clearCookie('auth');
        res.send({status:true,message:'Logout successfully.',login:false});

    }catch(error){
        next(error);
    }
}

exports.deleteAdmin = async (req,res,next)=>{
    
    try{

        const data = await Admin.findByIdAndDelete(req.params.id);
        if(data == null){
            res.status(400).send({status:false,message:"Faild to delete admin."});
        }
        else{

            res.status(400).send({status:true,message:"Admin delete successfully."});
        }

    }catch(error){
        next(error);
    }
}





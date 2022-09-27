require('dotenv').config();
const Message = require('../Models/Message');


//-------------------------------------------------------add Request------------------------------------------------

exports.addRequest = async (req,res,next)=>{
    try{


        const data = await Message({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            description:req.body.description
        });

        const d = await data.save();

        if(d != {}){
            res.send({status:true,message:"Request send successfully.",data:d});
        }else{
            res.send({status:true,message:"Faild to send Request."});
        }


        
    }catch(error){
        next(error);
    }
}


//---------------------------------------------------all Request--------------------------------------------------------

exports.allRequest= async (req,res,next)=>{
    try{
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page-1) * limit;
        const result = {};
        result.totalData = await Message.countDocuments();
        result.data = []

       


        if(limit == 0){
            result.totalPage = 1;
        }else{
            result.totalPage = Math.ceil(await Message.countDocuments()/limit);
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

        result.data = await Message.find().select({__v:0}).limit(limit).skip(skip);

        if(result.totalData<1){
            res.status(400).send({status:false,message:"Request not found."});
        }else{
            res.json({status:true,result});
        }

    }catch(error){
        next(error);
    }
}




//--------------------------------------------------------------------delete Request---------------------------------------------------

exports.deleteRequest = async (req,res,next)=>{
    try{

        const d = await Message.findById(req.params.id);

        if(d == null){
            res.status(400).send({status:false,message:"Request not found."});
        }else{

            const data = await Message.findByIdAndDelete(req.params.id);
            if(data == null){
                await res.status(400).send({status:false,message:"Faild to delete Request."});
            }
            else{
                res.json({status:true,message:'Request delete successfully.'});
            }
        }

    }catch(error){
        next(error);
    }
}
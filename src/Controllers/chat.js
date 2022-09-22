const Chat = require('../Models/Chat');
const User = require('../Models/User');

exports.sendChat = async (req, res, next) =>{
    try{
        // console.log(req.body);
        const data = await Chat({
            senderId:req.body.senderId,
            receiverId:req.body.receiverId,
            message:req.body.message,
            user:req.body.senderId
        });
        await data.save();

        res.send({status:true, message:"Message send successfully."});

    }catch(error){
        next(error);
    }
}

exports.getFrends = async (req, res, next) =>{
    try{

         Chat.distinct('receiverId',{ senderId:req.query.senderId }, async (error,data)=>{
            try{
                if(error){
                    next(error);
                }else{
                    const user = await User.find({_id:data}).select({name:1});
                    res.send({status:true, data:user});
                }
            }catch(error){
                next(error);
            }
        })


    }catch(error){
        next(error);
    }
}

exports.getMessage = async (req, res, next) =>{
    try{
        const data = await Chat.find({
            $or:[
                {
                    $and:[
                        { senderId:req.query.senderId },
                        { receiverId:req.query.receiverId}
                     ]
                },
                {
                    $and:[
                        { senderId:req.query.receiverId },
                        { receiverId:req.query.senderId}
                     ]
                }
            ]
        });

       res.send({status:true, data});
    }catch(error){
        next(error);
    }
}
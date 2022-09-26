const Chat = require('../Models/Chat');
const User = require('../Models/User');

// exports.sendChat = async (req, res, next) =>{
//     try{
//         // console.log(req.body);
//         const data = await Chat({
//             senderId:req.body.senderId,
//             receiverId:req.body.receiverId,
//             message:req.body.message,
//             user:req.body.senderId
//         });
//         await data.save();

//         res.send({status:true, message:"Message send successfully."});

//     }catch(error){
//         next(error);
//     }
// }


exports.sendChat = async (data) =>{
    // console.log(data)
    try{
        // console.log(req.body);
        const d = await Chat({
            senderId:data.senderId,
            receiverId:data.receiverId,
            message:data.message,
            user:data.senderId
        });
        await d.save();

    }catch(error){
        console.log(error);
    }
}


exports.getFrends = async (req, res, next) =>{
    try{

        let friend = [];

         Chat.distinct('receiverId',{
            $or:[
                {senderId:req.query.senderId},
            ]
         }, async (error,data)=>{
            try{
                if(error){
                    next(error);
                }else{
                    const user = await User.find({_id:data}).select({name:1});
                    friend = [...friend,...user];

                    Chat.distinct('senderId',{
                        $and:[
                            {receiverId:req.query.senderId},
                            {senderId:{$ne: req.query.senderId}}
                        ]
                     }, async (error,data)=>{
                        try{
                            if(error){
                                next(error);
                            }else{
                                const user = await User.find({_id:data}).select({name:1});
                                friend = [...friend,...user];
             
                                res.send({status:true, data:friend});
                            }
                        }catch(error){
                            next(error);
                        }
                    });
                }
            }catch(error){
                next(error);
            }
        });

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
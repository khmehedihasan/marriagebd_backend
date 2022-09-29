const Payment = require('../Models/Payment');
const User = require('../Models/User');


exports.addPayment = async (req, res, next)=>{
    try{
        const data = await Payment({
            user:req.params.id,
            packag:req.body.package,
            trxId:req.body.trxId
        });

        const d = await data.save();

        if(data.id != undefined){
            const dd = await User.findByIdAndUpdate(req.params.id,{ $push:{payments:d._id}});
            res.send({status:true, message:"Request send seccessfully."})
        }else{
            res.send({status:false, message:"Can not send request."})
        }

    }catch(error){
        next(error);
    }
}

//---------------------------------------------------all Payment --------------------------------------------------------

exports.getAllPayment = async (req, res, next) =>{
    try{

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page-1) * limit;
        const result = {};
        result.totalData = await Payment.countDocuments();
        result.data = []


        if(limit == 0){
            result.totalPage = 1;
        }else{
            result.totalPage = Math.ceil(await Payment.countDocuments()/limit);
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

        result.data = await Payment.find().select({password:0, token:0, verificationCode:0}).populate("user", "name phone uid packageValidity").limit(limit).skip(skip).sort({date: -1});

        if(result.totalData<1){
            res.status(400).send({status:false,message:"Payment not found."});
        }else{
            res.json({status:true,result});
        }



        // const age = getAge(data[1].birthDate);

    }catch(error){
        next(error);
    }
}



//---------------------------------------------------all Payment by id --------------------------------------------------------

exports.getAllPaymentById = async (req, res, next) =>{
    try{

        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page-1) * limit;
        const result = {};
        result.totalData = await Payment.find({user: req.params.id}).countDocuments();
        result.data = []


        if(limit == 0){
            result.totalPage = 1;
        }else{
            result.totalPage = Math.ceil(await Payment.countDocuments()/limit);
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

        result.data = await Payment.find({user: req.params.id}).select({password:0, token:0, verificationCode:0}).populate("user", "name phone uid packageValidity").limit(limit).skip(skip).sort({date: -1});

        if(result.totalData<1){
            res.status(400).send({status:false,message:"Payment not found."});
        }else{
            res.json({status:true,result});
        }



        // const age = getAge(data[1].birthDate);

    }catch(error){
        next(error);
    }
}


//---------------------------------------------------search Payment--------------------------------------------------------

exports.searchPayment = async (req,res,next)=>{
    try{


        const dcount = await Payment.find({"$or":[
            // {_id: { $regex: req.query.search, $options: 'i' } },
            // {user: { $regex: req.query.search, $options: 'i' } },
            {packag: { $regex: req.query.search, $options: 'i' } },
            {trxId: { $regex: req.query.search, $options: 'i' } },
        ]}).count();

        if(dcount<1){
            res.status(400).send({status:false,message:"Payment not found."});
        }else{
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const skip = (page-1) * limit;
            const result = {};
            result.data = [];


            result.data = await Payment.find({"$or":[
                // {_id: { $regex: req.query.search, $options: 'i' } },
                // {user: { $regex: req.query.search, $options: 'i' } },
                {packag: { $regex: req.query.search, $options: 'i' } },
                {trxId: { $regex: req.query.search, $options: 'i' } },
            ]}).populate("user", "name phone uid packageValidity").select({__v:0}).limit(limit).skip(skip).sort({data: -1});

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


//--------------------------------------------------------------------delete Payment---------------------------------------------------

exports.deletePayment = async (req,res,next)=>{
    try{
        const d = await Payment.findById(req.params.id).populate('user');
        if(d == null){
            res.status(404).send({status:false,message:"Payment not found."});
        }else{

            const data = await Payment.findByIdAndDelete(req.params.id);
            if(data == null){
                await res.status(400).send({status:false,message:"Faild to delete payment."});
            }
            else{
                await User.findByIdAndUpdate(data.user._id,{$pull:{payments:data._id}});
                res.json({status:true,message:'Payment delete successfully.'});
            }

        }
    }catch(error){
        next(error);
    }
}
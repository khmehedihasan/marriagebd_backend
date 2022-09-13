const User = require('../Models/User');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



exports.sendCode = async (req, res, next)=>{
    try{
        
        const code = `${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}`;

        const d = await User.find({"email":req.body.email});
        if(d.length > 0){
            const data = await User.findOneAndUpdate(d[0]._id,{$set:{verificationCode:code}})

            if(data._id != undefined){


                //---------------------------------------------------mail-----------------------------------------------
    
                var transport = nodemailer.createTransport({
                    host: process.env.EMAIL_HOST,
                    port: process.env.EMAIL_PORT,
                    starttls: {
                        enable: true
                    },
                    secureConnection: true,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    }
                    });
                    var mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: data.email,
                    subject: 'Vrification code from Marriage BD',
                    // text: 'Hey there, it’s our first message sent with Nodemailer from Easysheba ',
                    html: `
                    
                        <!DOCTYPE html>
                        <html lang="en">
                        <head>
                            <meta charset="UTF-8">
                            <meta http-equiv="X-UA-Compatible" content="IE=edge">
                            <meta name="viewport" content="width=device-width, initial-scale=1.0">
                            <title>Marriage BD</title>
    
                            <style>
                                body {
                                    margin: 0 auto !important;
                                    padding: 0 !important;
                                    height: 100% !important;
                                    width: 100% !important;
                                    background: white !important;
                                }
                            </style>
                        </head>
    
                        <body>
                            <h3>Dear ${data.name},</h3><br><br><br>
                            <div style=" text-align:center;">
                                <h2>Welcome to <b style=" color:tomato">Marriage BD</b></h2>
                                <p>Please verify your email.Your varification code is ${code}</p>
                                <P>Code: <b style=" color:tomato"> ${code}</b></p>
                            </div>
                        </body>
                        </html>
                                    
                    `
                    };
                    transport.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
    
    
                });
                res.send({status:true, message:"New code has been sent to your email.", login:false,id:data._id});
            }else{
                res.send({status:false, message:"Faild to send varification code.", login:false,});
            }    
        }


    }catch(error){
        next(error);
    }
}

exports.resendCode = async (req, res, next)=>{
    try{
        const code = `${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}`;

        const data = await User.findByIdAndUpdate(req.params.id,{$set:{verificationCode:code}},{new:true});


        if(data._id != undefined){
            //---------------------------------------------------mail-----------------------------------------------

            var transport = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                starttls: {
                    enable: true
                },
                secureConnection: true,
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS
                }
                });
                var mailOptions = {
                from: process.env.EMAIL_USER,
                to: data.email,
                subject: 'New varification code from Marriage BD',
                // text: 'Hey there, it’s our first message sent with Nodemailer from Easysheba ',
                html: `
                
                    <!DOCTYPE html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8">
                        <meta http-equiv="X-UA-Compatible" content="IE=edge">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Marriage BD</title>

                        <style>
                            body {
                                margin: 0 auto !important;
                                padding: 0 !important;
                                height: 100% !important;
                                width: 100% !important;
                                background: white !important;
                            }
                        </style>
                    </head>

                    <body>
                        <h3>Dear ${data.name},</h3><br><br><br>
                        <div style=" text-align:center;">
                            <h2>Welcome to <b style=" color:tomato">Marriage BD</b></h2>
                            <p>Please verify your email.Your varification code is ${code}</p>
                            <P>Code: <b style=" color:tomato"> ${code}</b></p>
                        </div>
                    </body>
                    </html>
                                
                `
                };
                transport.sendMail(mailOptions, (error, info) => {
                if (error) {
                    return console.log(error);
                }

            });
            res.send({status:true, message:"New code has been sent to your email.", login:false,});
        }else{
            res.send({status:false, message:"Faild to send varification code.", login:false,});
        }



    }catch(error){
        next(error);
    }
}

exports.varifyCode = async (req, res, next)=>{
    try{
        const data = await User.findById(req.params.id);

        if(data.verificationCode == req.body.code){

            const token = await jwt.sign({_id:req.params._id}, process.env.JWT_SEC,{expiresIn:"600s"});

            res.send({status:true, message:"Please reset your password.", login:false, token});            
        }else{
            res.send({status:false, message:"Invalid Code!", login:false,});
        }


    }catch(error){
        next(error);
    }
}

exports.reSetPassword = async (req, res, next)=>{
    try{

        const password = await bcrypt.hash(req.body.password, parseInt(process.env.BCRYPT_LOOP));
        const token = await jwt.sign({_id:req.params._id}, process.env.JWT_SEC,{expiresIn:process.env.JWT_EXP});

        const check = jwt.verify(token, process.env.JWT_SEC);

        if(check){
            const data = await User.findByIdAndUpdate(req.params.id,{$set:{password,token, verificationCode:''}},{new:true});

            if(data._id != undefined){
                res.send({status:true, message:"Password reset successfully.", login:false});
            }else{
                res.send({status:false, message:"Faild to reset password.", login:false});
            }
        }


    }catch(error){
        next(error);
    }
}




//--------------------------------------------loin User----------------------------------------------------------


exports.loginUser = async (req,res,next)=>{
    
    try{

        const user = await User.find({email:req.body.email});
       

        if(user.length > 0){

            const isUser = await bcrypt.compare(req.body.password, user[0].password);
            if(isUser){

                const token = await jwt.sign({_id:user[0].id},process.env.JWT_SEC,{expiresIn:process.env.JWT_EXP});
                const data = await User.findByIdAndUpdate(user[0]._id,{token:token},{new:true});

                res.cookie('token',data.token,{expires: new Date(Date.now() + parseInt(process.env.COOKIEEXP)),httpOnly:true, secure:true, signed:true, secret:process.env.COOKIESEC,sameSite:"none" });

                // res.cookie('auth','kfjk5kjksdwk23klskj90fj234i209sfj9u4iwej',{expires: new Date(Date.now() + parseInt(process.env.COOKIEEXP)) });

                res.json({status:true,message:'Login successfully.',login:true, id:user[0]._id});

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
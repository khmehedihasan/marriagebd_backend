const Unverified = require('../Models/Unverified');
const User = require('../Models/User');
const nodemailer = require('nodemailer');
const ShortUniqueId = require('short-unique-id');


exports.AddUnverified = async (req, res, next)=>{
    try{
        const uuid = new ShortUniqueId({ length: 16 });
        const uid = uuid();

        const reqData ={
        name,
        email,
        phone,
        candidateName,
        birthDate,
        religion,
        maritalStatus,
        nationality,
        gender,
        educationDetails,
        workingSector,
        educationQualification,
        professionDetails,
        profession,
        incame,
        homeDivision,
        fatherStatus,
        familyDetails,
        livingIn,
        fatherOccupation,
        motherStatus,
        motherOccupation,
        livingCity,
        marriedBrother,
        unMarriedBrother,
        marriedSister,
        unMarriedSister,
        physicalDetails,
        weight,
        height,
        blood,
        bodyType,
        complexion,
        smoke,
        religiousValue,
        familyVale,
        diet,
        aboutSelf,
        password
        } = req.body;

    const user = await User({
        uid,
        name,
        email,
        phone,
        candidateName,
        birthDate,
        religion,
        maritalStatus,
        nationality,
        gender,
        educationDetails,
        workingSector,
        educationQualification,
        professionDetails,
        profession,
        incame,
        homeDivision,
        fatherStatus,
        familyDetails,
        livingIn,
        fatherOccupation,
        motherStatus,
        motherOccupation,
        livingCity,
        marriedBrother,
        unMarriedBrother,
        marriedSister,
        unMarriedSister,
        physicalDetails,
        weight,
        height,
        blood,
        bodyType,
        complexion,
        smoke,
        religiousValue,
        familyVale,
        diet,
        aboutSelf,
        password
    });

    await user.createToken();

    const data = await user.save();


    if(data._id != undefined ){

        const code = `${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}`;

        const d = await Unverified({
            userId:data._id,
            data:{
                uid,
                name,
                email,
                phone,
                candidateName,
                birthDate,
                religion,
                maritalStatus,
                nationality,
                gender,
                educationDetails,
                workingSector,
                educationQualification,
                professionDetails,
                profession,
                incame,
                homeDivision,
                fatherStatus,
                familyDetails,
                livingIn,
                fatherOccupation,
                motherStatus,
                motherOccupation,
                livingCity,
                marriedBrother,
                unMarriedBrother,
                marriedSister,
                unMarriedSister,
                physicalDetails,
                weight,
                height,
                blood,
                bodyType,
                complexion,
                smoke,
                religiousValue,
                familyVale,
                diet,
                aboutSelf
            },
            verificationCode:code
        });

        const de = await d.save();

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
            to: email,
            subject: 'Varification code from Marriage BD ',
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
                    <h3>Dear ${name},</h3><br><br><br>
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
            // console.log('Message id:',  info.messageId);
            // res.send({status:true, message:"Mail send successfully.", messageId:info.messageId});
          });


        res.send({status:true, message:"Sign up successfully.", login:false, id:de._id});

        
    }else{
        res.status(400).send({status:false, message:"Faild to sign up!", login:false});
    }

    }catch(error){
        // console.log(error)
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


exports.varifyEmail = async (req, res, next)=>{
    try{
        const data = await Unverified.find({_id:req.params.id}).select({data:0});

        if(data[0].verificationCode == req.body.code){

            await Unverified.findByIdAndDelete(req.params.id);
            
            res.send({status:true, message:"Email verified successfully.", login:false});
        }else{
            res.send({status:false, message:"Invalid Code.", login:false,});
        }


    }catch(error){
        next(error);
    }
}

exports.resendCode = async (req, res, next)=>{
    try{
        const code = `${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}`;

        const data = await Unverified.findByIdAndUpdate(req.params.id,{$set:{verificationCode:code}},{new:true});


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
                to: data.data.email,
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
                        <h3>Dear ${data.data.name},</h3><br><br><br>
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
                // console.log('Message id:',  info.messageId);
                // res.send({status:true, message:"Mail send successfully.", messageId:info.messageId});
            });
            res.send({status:true, message:"New code has been sent to your email.", login:false,});
        }else{
            res.send({status:false, message:"Faild to send varification code.", login:false,});
        }



    }catch(error){
        next(error);
    }
}
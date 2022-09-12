const User = require('../Models/User');
const nodemailer = require('nodemailer')
exports.sendCode = async (req, res, next)=>{
    try{
        
        const code = `${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}${Math.round(Math.random()*9)}`;

        const d = await User.find({"email":req.body.email});
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
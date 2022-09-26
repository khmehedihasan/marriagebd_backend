const User = require('../Models/User');
const fs = require('fs');

// const getAge = (date)=>{

//     var today = new Date();

//     const datesplit=date.split('-');

//     const year = parseInt(datesplit[0]);
//     const month = parseInt(datesplit[1]);
//     const day = parseInt(datesplit[2]);

//     let age = today.getFullYear() - year;

//     if (today.getMonth()+1 < month || (today.getMonth()+1 == month && today.getDate() < day)) {
//         age--;
//     }

//     return age;
// }

//---------------------------------------------------all User --------------------------------------------------------

exports.getAlluser = async (req, res, next) =>{
    try{
        const data = await User.find().select({password:0, token:0, verificationCode:0});
        res.send(data);

        // const age = getAge(data[1].birthDate);

    }catch(error){
        next(error);
    }
}



//---------------------------------------------------Single User --------------------------------------------------------


exports.getSingle = async (req, res, next) =>{
    try{
        const data = await User.findById(req.params.id).select({password:0, token:0, verificationCode:0});
        if(data !== null ){
            res.send({status:true, data});
        }else{
            res.send({status:false});
        };

    }catch(error){
        next(error);
    }
}



// exports.search = async (req, res, next) =>{


//     const getDay = (age)=>{

//         const date = new Date()
    
//         const year = date.getFullYear()-age;
//         const month = date.getMonth();
//         const dat = date.getDate();
//         // console.log(year)
//         // console.log(month)
//         // console.log(dat)

//         // console.log(new Date(`${year}-${month}-${dat}`))


//         return(new Date(`${year}-${month}-${dat}`))
//     }

//     try{

//         const profession = [
//             // "Accounting & Banking",
//             // "Administration & HR",
//             // "Advertising & Media",
//             "Agriculture",
//             // "Airline & Aviation",
//             // "Architecture & Design",
//             // "Artists & Animators",
//             // "Beauty & Fashion",
//             // "Defense",
//             // "Education & Training",
//             // "Engineering",
//             "IT & Software Engineering",
//             // "Legal",
//             // "Medical & Healthcare",
//             "Sales & Marketing",
//             // "Business & Others",
//             // "Not Working"
//           ]

//           const workingSector  =[
//             "Private Company",
//             // "Government / Public Sector",
//             // "Defense / Civil Services",
//             // "Business / Self Employed",
//             " Not Working"
//           ]

//           const educationQualification = ["Bachelors"]

//           const livingCity = ["Dhaka","Tangail"]

//           const livingIn = ["Bangladesh"]

//         const data = await User.find(

//             {
//                 $and:[
//                     {"gender":"Female"},
//                     {
//                         "birthDate":{
//                             $gte: getDay(80),
//                             $lte: getDay(10)
//                         }
//                     },
//                     {
//                         "height":{
//                             $gte:40,
//                             $lte:80
//                         }
//                     },
//                     {
//                         "profession":{ $in : profession },

//                     },
//                     {
//                         "workingSector":{$in:workingSector}
//                     },
//                     {
//                         "educationQualification":{$in:educationQualification}
//                     },
//                     {
//                         "livingCity":{$in:livingCity}
//                     },
//                     {
//                         "livingIn":{$in:livingIn}
//                     }
//                 ]
//             }
            
//             ).select({password:0, token:0, verificationCode:0});
//         res.send(data);
//     }catch(error){
//         next(error);
//     }
// }


//---------------------------------------------------all User by search--------------------------------------------------------

exports.search = async (req,res,next)=>{
    try{

        
        const {gender, home_division, education, living_country, working_sector, professional_area, ageMin, ageMax, heightMin, heightMax } = req.body;
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);
        const skip = (page-1) * limit;
        const result = {};
        const getDay = (age)=>{

            const date = new Date()
        
            const year = date.getFullYear()-age;
            const month = date.getMonth();
            const dat = date.getDate();
    
            return(new Date(`${year}-${month}-${dat}`))
        }

        result.totalData = await User.find(
            {
                $and:[
                    {"gender":gender},
                    {
                        "birthDate":{
                            $gte: getDay(ageMax),
                            $lte: getDay(ageMin)
                        }
                    },
                    {
                        "height":{
                            $gte:heightMin,
                            $lte:heightMax
                        }
                    },
                    {
                        "profession":{ $in : professional_area},

                    },
                    {
                        "workingSector":{$in:working_sector}
                    },
                    {
                        "educationQualification":{$in:education}
                    },
                    {
                        "homeDivision":{$in:home_division}
                    },
                    {
                        "livingIn":{$in:living_country}
                    }
                ]
            }
        ).countDocuments();
        result.data = [];


        if(limit == 0){
            result.totalPage = 1;
        }else{
            result.totalPage = Math.ceil(await User.find(
                {
                    $and:[
                        {"gender":gender},
                        {
                            "birthDate":{
                                $gte: getDay(ageMax),
                                $lte: getDay(ageMin)
                            }
                        },
                        {
                            "height":{
                                $gte:heightMin,
                                $lte:heightMax
                            }
                        },
                        {
                            "profession":{ $in : professional_area},
    
                        },
                        {
                            "workingSector":{$in:working_sector}
                        },
                        {
                            "educationQualification":{$in:education}
                        },
                        {
                            "homeDivision":{$in:home_division}
                        },
                        {
                            "livingIn":{$in:living_country}
                        }
                    ]
                }
            ).countDocuments()/limit);
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

        result.data = await User.find(
            {
                $and:[
                    {"gender":gender},
                    {
                        "birthDate":{
                            $gte: getDay(ageMax),
                            $lte: getDay(ageMin)
                        }
                    },
                    {
                        "height":{
                            $gte:heightMin,
                            $lte:heightMax
                        }
                    },
                    {
                        "profession":{ $in : professional_area},

                    },
                    {
                        "workingSector":{$in:working_sector}
                    },
                    {
                        "educationQualification":{$in:education}
                    },
                    {
                        "homeDivision":{$in:home_division}
                    },
                    {
                        "livingIn":{$in:living_country}
                    }
                ]
            }
        ).select({__v:0}).limit(limit).skip(skip);

        // console.log(result)

        if(result.totalData<1){
            res.status(400).send({status:false,message:"No people found."});
        }else{
            res.json({status:true,result});
        }

    }catch(error){
        next(error);
    }
}

exports.changePic = async (req, res, next) =>{
    try{
        const photo = req.file.filename;
        const image = process.env.PUBLIC_LINK+req.file.filename;

        const data = await User.findByIdAndUpdate(req.params.id,{$set:{
            img:image,
            photo:photo
        }});

        if(data._id == undefined){

            fs.unlink('./src/upload/' + photo, (error) => {
                if (error) {
                    next(error);
                }
            });
            res.status(400).send({status:false,message:"User not found."});

        }else{
            if(data.photo){
                fs.unlink('./src/upload/' + data.photo, (error) => {
                    if (error) {
                        next(error);
                    }
                });
            }

            res.json({status:true,message:'Profile picture update successfully.'});
        }
    }catch(error){
        next(error);
    }
}
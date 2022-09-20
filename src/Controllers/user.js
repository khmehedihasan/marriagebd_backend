const User = require('../Models/User');

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


exports.getAlluser = async (req, res, next) =>{
    try{
        const data = await User.find().select({password:0, token:0, verificationCode:0});
        res.send(data);

        // const age = getAge(data[1].birthDate);

    }catch(error){
        next(error);
    }
}

exports.search = async (req, res, next) =>{


    const getDay = (age)=>{

        const date = new Date()
    
        const year = date.getFullYear()-age;
        const month = date.getMonth();
        const dat = date.getDate();
        // console.log(year)
        // console.log(month)
        // console.log(dat)

        // console.log(new Date(`${year}-${month}-${dat}`))


        return(new Date(`${year}-${month}-${dat}`))
    }

    try{

        const profession = [
            // "Accounting & Banking",
            // "Administration & HR",
            // "Advertising & Media",
            "Agriculture",
            // "Airline & Aviation",
            // "Architecture & Design",
            // "Artists & Animators",
            // "Beauty & Fashion",
            // "Defense",
            // "Education & Training",
            // "Engineering",
            "IT & Software Engineering",
            // "Legal",
            // "Medical & Healthcare",
            "Sales & Marketing",
            // "Business & Others",
            // "Not Working"
          ]

          const workingSector  =[
            "Private Company",
            // "Government / Public Sector",
            // "Defense / Civil Services",
            // "Business / Self Employed",
            " Not Working"
          ]

          const educationQualification = ["Bachelors"]

          const livingCity = ["Dhaka","Tangail"]

          const livingIn = ["Bangladesh"]

        const data = await User.find(

            {
                $and:[
                    // {"gender":"Female"},
                    {
                        "birthDate":{
                            $gte: getDay(80),
                            $lte: getDay(10)
                        }
                    },
                    {
                        "height":{
                            $gte:40,
                            $lte:80
                        }
                    },
                    {
                        "profession":{ $in : profession },

                    },
                    {
                        "workingSector":{$in:workingSector}
                    },
                    {
                        "educationQualification":{$in:educationQualification}
                    },
                    {
                        "livingCity":{$in:livingCity}
                    },
                    {
                        "livingIn":{$in:livingIn}
                    }
                ]
            }
            
            ).select({password:0, token:0, verificationCode:0});
        res.send(data);
    }catch(error){
        next(error);
    }
}
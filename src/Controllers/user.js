const User = require("../Models/User");
const fs = require("fs");

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

exports.getAlluser = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;
    const result = {};
    result.totalData = await User.countDocuments();
    result.data = [];

    if (limit == 0) {
      result.totalPage = 1;
    } else {
      result.totalPage = Math.ceil((await User.countDocuments()) / limit);
    }

    result.previous = {
      page: page - 1,
      limit,
    };
    if (page == result.totalPage) {
      result.next = {
        page: 0,
        limit,
      };
    } else {
      result.next = {
        page: page + 1,
        limit,
      };
    }

    result.data = await User.find()
      .select({ password: 0, token: 0, verificationCode: 0 })
      .limit(limit)
      .skip(skip);

    if (result.totalData < 1) {
      res.status(400).send({ status: false, message: "User not found." });
    } else {
      res.json({ status: true, result });
    }

    // const age = getAge(data[1].birthDate);
  } catch (error) {
    next(error);
  }
};

//---------------------------------------------------search user--------------------------------------------------------

exports.searchUser = async (req, res, next) => {
  try {
    const dcount = await User.find({
      $or: [
        { uid: { $regex: req.query.search, $options: "i" } },
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
        { phone: { $regex: req.query.search, $options: "i" } },
      ],
    }).count();

    if (dcount < 1) {
      res.status(400).send({ status: false, message: "User not found." });
    } else {
      const page = parseInt(req.query.page);
      const limit = parseInt(req.query.limit);
      const skip = (page - 1) * limit;
      const result = {};
      result.data = [];

      result.data = await User.find({
        $or: [
          { uid: { $regex: req.query.search, $options: "i" } },
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
          { phone: { $regex: req.query.search, $options: "i" } },
        ],
      })
        .select({ __v: 0 })
        .limit(limit)
        .skip(skip);

      result.totalData = dcount;

      if (limit == 0) {
        result.totalPage = 1;
      } else {
        result.totalPage = Math.ceil(dcount / limit);
      }

      result.previous = {
        page: page - 1,
        limit,
      };

      if (page == result.totalPage) {
        result.next = {
          page: 0,
          limit,
        };
      } else {
        result.next = {
          page: page + 1,
          limit,
        };
      }

      res.json({ status: true, result });
    }
  } catch (error) {
    next(error);
  }
};

//---------------------------------------------------Single User --------------------------------------------------------

exports.getSingle = async (req, res, next) => {
  try {
    const data = await User.findById(req.params.id)
      .populate("payments", "package trxId date")
      .select({ password: 0, token: 0, verificationCode: 0 });
    if (data !== null) {
      res.send({ status: true, data });
    } else {
      res.send({ status: false });
    }
  } catch (error) {
    next(error);
  }
};

exports.packageValidity = async (req, res, next) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, {
      packageValidity: req.body.date,
    });
    if (data._id === undefined) {
      res.send({ status: false, message: "Faild to update validity." });
    } else {
    }
    res.send({ status: true, message: "Successfully update validity." });
  } catch (error) {
    next(error);
  }
};

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

exports.search = async (req, res, next) => {
  try {
    const {
      gender,
      home_division,
      education,
      living_country,
      working_sector,
      professional_area,
      ageMin,
      ageMax,
      heightMin,
      heightMax,
    } = req.body;
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const skip = (page - 1) * limit;
    const result = {};
    const getDay = (age) => {
      const date = new Date();

      const year = date.getFullYear() - age;
      const month = date.getMonth();
      const dat = date.getDate();

      return new Date(`${year}-${month}-${dat}`);
    };

    result.totalData = await User.find({
      $and: [
        { gender: gender },
        {
          birthDate: {
            $gte: getDay(ageMax),
            $lte: getDay(ageMin),
          },
        },
        {
          height: {
            $gte: heightMin,
            $lte: heightMax,
          },
        },
        {
          profession: { $in: professional_area },
        },
        {
          workingSector: { $in: working_sector },
        },
        {
          educationQualification: { $in: education },
        },
        {
          homeDivision: { $in: home_division },
        },
        {
          livingIn: { $in: living_country },
        },
      ],
    }).countDocuments();
    result.data = [];

    if (limit == 0) {
      result.totalPage = 1;
    } else {
      result.totalPage = Math.ceil(
        (await User.find({
          $and: [
            { gender: gender },
            {
              birthDate: {
                $gte: getDay(ageMax),
                $lte: getDay(ageMin),
              },
            },
            {
              height: {
                $gte: heightMin,
                $lte: heightMax,
              },
            },
            {
              profession: { $in: professional_area },
            },
            {
              workingSector: { $in: working_sector },
            },
            {
              educationQualification: { $in: education },
            },
            {
              homeDivision: { $in: home_division },
            },
            {
              livingIn: { $in: living_country },
            },
          ],
        }).countDocuments()) / limit
      );
    }

    result.previous = {
      page: page - 1,
      limit,
    };
    if (page == result.totalPage) {
      result.next = {
        page: 0,
        limit,
      };
    } else {
      result.next = {
        page: page + 1,
        limit,
      };
    }

    result.data = await User.find({
      $and: [
        { gender: gender },
        {
          birthDate: {
            $gte: getDay(ageMax),
            $lte: getDay(ageMin),
          },
        },
        {
          height: {
            $gte: heightMin,
            $lte: heightMax,
          },
        },
        {
          profession: { $in: professional_area },
        },
        {
          workingSector: { $in: working_sector },
        },
        {
          educationQualification: { $in: education },
        },
        {
          homeDivision: { $in: home_division },
        },
        {
          livingIn: { $in: living_country },
        },
      ],
    })
      .select({ __v: 0 })
      .limit(limit)
      .skip(skip);

    // console.log(result)

    if (result.totalData < 1) {
      res.status(400).send({ status: false, message: "No people found." });
    } else {
      res.json({ status: true, result });
    }
  } catch (error) {
    next(error);
  }
};

exports.changePic = async (req, res, next) => {
  try {
    const photo = req.file.filename;
    const image = process.env.PUBLIC_LINK + req.file.filename;

    const data = await User.findByIdAndUpdate(req.params.id, {
      $set: {
        img: image,
        photo: photo,
      },
    });

    if (data._id == undefined) {
      fs.unlink("./src/upload/" + photo, (error) => {
        if (error) {
          next(error);
        }
      });
      res.status(400).send({ status: false, message: "User not found." });
    } else {
      if (data.photo) {
        fs.unlink("./src/upload/" + data.photo, (error) => {
          if (error) {
            next(error);
          }
        });
      }

      res.json({
        status: true,
        message: "Profile picture update successfully.",
      });
    }
  } catch (error) {
    next(error);
  }
};

//----------------------------------------- update user ----------------------------------------------

exports.updateUser = async (req, res, next) => {
  try {
    const {
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
    } = req.body;

    const data = await User.findByIdAndUpdate(req.params.id, {
      $set: {
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
      },
    });

    if (data._id != undefined) {
      res.send({ status: true, message: "Info update successfully." });
    } else {
      res.send({ status: false, message: "Faild to update Info." });
    }
  } catch (error) {
    next(error);
  }
};

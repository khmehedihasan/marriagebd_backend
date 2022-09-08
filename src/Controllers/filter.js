const Filter = require('../Models/Filter');

exports.addFilter = async (req, res, next)=>{
    try{

        // const data = await Filter({
        //     home_division:[
        //         "Dhaka",
        //         "Chittagong",
        //         "Sylhet",
        //         "Khulna",
        //         "Barisal",
        //         "Rajshahi",
        //         "Rangpur",
        //         "Mymensingh"
        //     ],
        //     education:[
        //         "Doctorate / Phd / MPhil",
        //         "Masters",
        //         "Bachelors",
        //         "FCPS / MD",
        //         "MBBS / BDS",
        //         "Undergraduate",
        //         "Diploma",
        //         "Professional Degree",
        //         "HSC / A-Label",
        //         "Others",
        //     ],
        //     professional_area:[
        //         "Accounting & Banking",
        //             "Administration & HR",
        //             "Advertising & Media",
        //             "Agriculture",
        //             "Airline & Aviation",
        //             "Architecture & Design",
        //             "Artists & Animators",
        //             "Beauty & Fashion",
        //             "Defense",
        //             "Education & Training",
        //             "Engineering",
        //             "IT & Software Engineering",
        //             "Legal",
        //             "Medical & Healthcare",
        //             "Sales & Marketing",
        //             "Business & Others",
        //             "Not Working",
        //                         ],
        //     working_sector:[
        //         "Private Company",
        //         "Government / Public Sector",
        //         "Defense / Civil Services",
        //         "Business / Self Employed",
        //        " Not Working",
        //     ],
        //     living_country:[
        //         "Bangladesh",
        //         "Australia",
        //         "Canada",
        //         "China",
        //         "Cyprus",
        //         "Denmark",
        //         "Finland",
        //         "France",
        //         "Germany",
        //         "Greece",
        //         "India",
        //         "Indonesia",
        //         "Ireland",
        //         "Italy",
        //         "Japan",
        //         "Korea",
        //         "Kuwait",
        //         "Malaysia",
        //         "Nepal",
        //         "Netherlands",
        //         "New Zealand",
        //         "Norway",
        //         "Oman",
        //         "Pakistan",
        //         "Qatar",
        //         "Russia",
        //         "Saudi Arabia",
        //         "Singapore",
        //         "South Africa",
        //         "Spain",
        //         "Sri Lanka",
        //         "Sweden",
        //         "Switzerland",
        //         "Thailand",
        //         "United Arab Emirates",
        //        " United Kingdom",
        //         "USA",
        //         "Other Countries",
        //     ]
        // })


        // const d = await data.save();

        // res.send(d);

    }catch(error){
        next(error);
    }
}


exports.getFilter = async (req, res, next)=>{
    try{
        const data = await Filter.find();
        res.send({status:true, data:data[0]});
    }catch(error){
        next(error);
    }
}
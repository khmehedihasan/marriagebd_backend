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
        //     ],
        //     height:[
        //         `3'`,
        //         `3' 1"`,
        //         `3' 2"`,
        //         `3' 3"`,
        //         `3' 4"`,
        //         `3' 6"`,
        //         `3' 7"`,
        //         `3' 8"`,
        //         `3' 9"`,

        //         `4'`,
        //         `4' 1"`,
        //         `4' 2"`,
        //         `4' 3"`,
        //         `4' 4"`,
        //         `4' 6"`,
        //         `4' 7"`,
        //         `4' 8"`,
        //         `4' 9"`,

        //         `5'`,
        //         `5' 1"`,
        //         `5' 2"`,
        //         `5' 3"`,
        //         `5' 4"`,
        //         `5' 6"`,
        //         `5' 7"`,
        //         `5' 8"`,
        //         `5' 9"`,

        //         `6'`,
        //         `6' 1"`,
        //         `6' 2"`,
        //         `6' 3"`,
        //         `6' 4"`,
        //         `6' 6"`,
        //         `6' 7"`,
        //         `6' 8"`,
        //         `6' 9"`,

        //         `7'`,
        //         `7' 1"`,
        //         `7' 2"`,
        //         `7' 3"`,
        //         `7' 4"`,
        //         `7' 6"`,
        //         `7' 7"`,
        //         `7' 8"`,
        //         `7' 9"`,

        //         `8'`,
        //         `8' 1"`,
        //         `8' 2"`,
        //         `8' 3"`,
        //         `8' 4"`,
        //         `8' 6"`,
        //         `8' 7"`,
        //         `8' 8"`,
        //         `8' 9"`,
        //     ],
        //     weight:[
        //         "<< 18 Kg",
        //         "19 Kg",

        //         "20 Kg",
        //         "21 Kg",
        //         "22 Kg",
        //         "23 Kg",
        //         "24 Kg",
        //         "25 Kg",
        //         "26 Kg",
        //         "27 Kg",
        //         "28 Kg",
        //         "29 Kg",

        //         "30 Kg",
        //         "31 Kg",
        //         "32 Kg",
        //         "33 Kg",
        //         "34 Kg",
        //         "35 Kg",
        //         "36 Kg",
        //         "37 Kg",
        //         "38 Kg",
        //         "39 Kg",

        //         "40 Kg",
        //         "41 Kg",
        //         "42 Kg",
        //         "43 Kg",
        //         "44 Kg",
        //         "45 Kg",
        //         "46 Kg",
        //         "47 Kg",
        //         "48 Kg",
        //         "49 Kg",

        //         "50 Kg",
        //         "51 Kg",
        //         "52 Kg",
        //         "53 Kg",
        //         "54 Kg",
        //         "55 Kg",
        //         "56 Kg",
        //         "57 Kg",
        //         "58 Kg",
        //         "59 Kg",

        //         "60 Kg",
        //         "61 Kg",
        //         "62 Kg",
        //         "63 Kg",
        //         "64 Kg",
        //         "65 Kg",
        //         "66 Kg",
        //         "67 Kg",
        //         "68 Kg",
        //         "69 Kg",

        //         "70 Kg",
        //         "71 Kg",
        //         "72 Kg",
        //         "73 Kg",
        //         "74 Kg",
        //         "75 Kg",
        //         "76 Kg",
        //         "77 Kg",
        //         "78 Kg",
        //         "79 Kg",

        //         "80 Kg",
        //         "81 Kg",
        //         "82 Kg",
        //         "83 Kg",
        //         "84 Kg",
        //         "85 Kg",
        //         "86 Kg",
        //         "87 Kg",
        //         "88 Kg",
        //         "89 Kg",

        //         "90 Kg",
        //         "91 Kg",
        //         "92 Kg",
        //         "93 Kg",
        //         "94 Kg",
        //         "95 Kg",
        //         "96 Kg",
        //         "97 Kg",
        //         "98 Kg",
        //         "99 Kg",

        //         "100 Kg",
        //         "101 Kg",
        //         "102 Kg",
        //         "103 Kg",
        //         "104 Kg",
        //         "105 Kg",
        //         "106 Kg",
        //         "107 Kg",
        //         "108 Kg",
        //         "109 Kg",

        //         "110 Kg",
        //         "111 Kg",
        //         "112 Kg",
        //         "113 Kg",
        //         "114 Kg",
        //         "115 Kg",
        //         "116 Kg",
        //         "117 Kg",
        //         "118 Kg",
        //         "119 Kg",
        //         "120 Kg <<",
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
const mongoose = require('mongoose');

const filterSchema = mongoose.Schema({

    home_division:[],
    education:[],
    professional_area:[],
    working_sector:[],
    living_country:[],
    height:[],
    weight:[]

});

const Filter = mongoose.model("Filter", filterSchema);

module.exports = Filter;
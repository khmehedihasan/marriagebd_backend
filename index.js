require('dotenv').config();
require('./src/DB/connect');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.json({
    type:['application/json','text/plain','application/x-www-form-urlencoded']
}));

app.use(cookieParser(process.env.COOKIESEC));

app.use(require('./src/Middlewares/allowHeaders'));

app.use('/public/upload',express.static('./src/upload'));


app.get('/', async (req,res,next)=>{

   try{
        res.json({status:true});
   }catch(error){

        next(error);
   }
})


//----------------------------------------------------Routers-----------------------------------------------------

// app.use('/user',require('./src/Routers/user'));

app.use('/filter', require('./src/Routers/filter'));






//----------------------------------------------Error handler-----------------------------------------------

app.use(require('./src/Middlewares/errorHandler'));




app.listen(process.env.PORT,()=>{
    console.log(`App is running on port ${process.env.PORT}...`);
});
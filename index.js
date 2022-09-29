require('dotenv').config();
require('./src/DB/connect');
const cookieParser = require('cookie-parser');
const express = require('express');
const { Server } = require('socket.io');
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

app.use('/user',require('./src/Routers/user'));
app.use('/admin',require('./src/Routers/admin'));
const logoutUser = require('./src/Controllers/logOut');

app.use('/filter', require('./src/Routers/filter'));
app.use('/verify', require('./src/Routers/verify'));
app.use('/login', require('./src/Routers/login'));
app.delete('/logout/:id', logoutUser);

app.use('/chat',require('./src/Routers/chat'));
app.use('/message',require('./src/Routers/message'));
app.use('/payment',require('./src/Routers/payment'));







//----------------------------------------------Error handler-----------------------------------------------

app.use(require('./src/Middlewares/errorHandler'));



//----------------------------------------------socket.io-----------------------------------------------
const chat = require('./src/Controllers/chat')
const server = require('http').createServer(app);

const io = new Server(server,{
    
    cors:{
        methods:["GET", "POST"],
        origin:["http://localhost:3000"]
    },
});

io.on("connection", (socket)=>{
    // console.log(socket.id);


    socket.on("join_chat", (data)=>{
        socket.join(data);
        // console.log(data)
    });

    socket.on("send_message", (data)=>{
        // console.log(data)
        chat.sendChat(data);
        socket.to(data.receiverId).emit("receive_message",data);
    });

    socket.on("disconnect", ()=>{
        // console.log('Disconnected')
    });
})




server.listen(process.env.PORT,()=>{
    console.log(`App is running on port ${process.env.PORT}...`);
});
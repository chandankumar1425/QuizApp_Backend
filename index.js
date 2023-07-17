const express = require('express');
require('dotenv').config();
const connection = require('./db')
const {UserRouter} = require('./routes/user.route')
const {QuizRouter} = require('./routes/quiz.route');

const app = express();
app.get('/', (req, res) =>{
    res.send("Welcome to QuizApplication")
})
app.use(express.json())
app.use("/user",UserRouter);
app.use("/quiz",QuizRouter);

app.listen(4040, async(req,res)=>{
    try{
        await connection 
        console.log('database is connected');
    } catch(err){
        console.log(err.message);
        console.log("server is not running..")
    }
    console.log("server is running on port 4040");
})
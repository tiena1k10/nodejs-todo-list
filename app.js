const express = require('express');

const app = express();
const path = require('path');
// setup public folder
app.use(express.static("./src/public"));
app.use(express.json());
const PORT = 8888
const db = require("./src/db/connect");


var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


const start = async () =>{
    await db.connect().then(()=>{console.log("a");});
    await app.listen(8000,()=>{
        console.log("b");
    })
    await setTimeout(()=>{
        console.log("c");
    },4000)
    setTimeout(()=>{
        console.log("d");
    },0)
    console.log("e");
}

start();

// db.connect().then(()=>{
//     console.log("db Thanh cong");
//     return app.listen(8888);
// }).then(()=>{
//     console.log("server");
// })


// app.listen(PORT,()=>{
//     console.log("Server is listening on: http://localhost:8888/");

// });

// setup router
const taskRouter = require('./src/routes/TaskRouter');
const { resolve } = require('path');
app.use('/api/v1/task',taskRouter);

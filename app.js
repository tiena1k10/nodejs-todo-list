const express = require('express');

const app = express();
const path = require('path');
// setup public folder
app.use(express.static("./src/public"));
app.use(express.json());
const PORT = 8888
app.listen(PORT,()=>{
    console.log("Server is listening on: http://localhost:8888/");
})
// setup router
const taskRouter = require('./src/routes/TaskRouter');
app.use('/api/v1/task',taskRouter);

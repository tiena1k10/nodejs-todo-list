const read = require("body-parser/lib/read");
const { reset } = require("nodemon");
const { required } = require("nodemon/lib/config");

const TaskModel = require('../models/TaskModel');
const getAllTask = (req,res)=>{
    // res.sendFile('./src/pubic/test.html');
    // TaskModel.
}

const createTask =  (req,res)=>{
    TaskModel.create({
        name: req.body.name,
        completed: false,
    }).then(value=>{
        res.json({value});
    }).catch(err=>{
        
    });
}

const updateTask = (req,res)=>{
    res.send("all list");
}

const deleteTask = (req,res)=>{
    res.send("all list");
}
const getTask = (req,res)=>{
    res.send("all list");
}

module.exports = {
    getAllTask,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}


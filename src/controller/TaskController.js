const read = require("body-parser/lib/read");
const { reset } = require("nodemon");
const { required } = require("nodemon/lib/config");

const taskModel = require('../models/TaskModel');
const getAllTask = (req,res)=>{
    taskModel.find({}).then((tasks)=>{
        res.status(200).json({tasks});
    }).catch(err=>{
        res.status(500).json({msg:err});
    })
}

const createTask =  (req,res)=>{
    taskModel.create({
        name: req.body.name,
       
    }).then(value=>{
        res.status(201).json({value});
    }).catch(err=>{
        res.status(500).json({msg:err});
    });
}

const updateTask = (req,res)=>{
    const {name,completed} = req.body;
    taskModel.findByIdAndUpdate(req.params.id,{name,completed})
    .then((taskBefore)=>{
        console.log("sua thanh cong");
        return  taskModel.findById(taskBefore.id)
       
    }).then((task)=>{
        res.status(200).json({task});
    })
    .catch(err=>{
        res.status(500).json({msg:err});
    });
}

const deleteTask = (req,res)=>{
    console.log(req.params.id);
    taskModel.findByIdAndDelete(req.params.id)
    .then((value)=>{
        return taskModel.find({});
    })
    .then((tasks)=>{
        res.status(200).json({tasks});
    }).catch(err=>{
        res.status(500).json({msg:err});
    })
}
const getTask = (req,res)=>{
    
    taskModel.findById(req.params.id)
    .then(task=>{
        if(task)
        res.status(200).json({task});
    }).catch(err=>{
        res.status(500).json({msg:err});
    })
}

module.exports = {
    getAllTask,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}


const read = require("body-parser/lib/read");
const { reset } = require("nodemon");
const { required } = require("nodemon/lib/config");

const taskModel = require('../models/task-model');
const getAllTask = (req,res)=>{
    taskModel.find({})
    .then((tasks)=>{
        res.status(200).json({status:"success",data:{tasks}});
    })
    .catch(err=>{
        res.status(500).json({msg:err});
    })
}

const createTask =  (req,res)=>{
    taskModel.create({
        name: req.body.name,
    }).then(task=>{
        res.status(201).json({task});
    }).catch(err=>{
        res.status(500).json({msg:err});
    });
}

const updateTask = (req,res)=>{
    const {name,completed} = req.body;
    taskModel.findByIdAndUpdate(req.params.id,req.body,{
        new : true,
        runValidators: true,
    })
    .then((task)=>{
        task ? 
        res.status(200).json({task}) : res.status(404).json({msg:`${req.params.id} does not exis ! `});
    })
    .catch(err=>{
        res.status(500).json({msg:err});
    });
}

const deleteTask = (req,res)=>{
    taskModel.findByIdAndDelete(req.params.id)
    .then((task)=>{
        task ? res.status(200).json({task}) :  res.status(404).json({msg:`${req.params.id} does not exis ! `});
    })
    .catch(err=>{
        res.status(500).json({msg:err});
    })
}
const getTask = (req,res)=>{
    
    taskModel.findById(req.params.id)
    // if req.params.id.lenght == _id.lenght (default) ==> task = null => 404
    // else ==> throw err (catch) => 500;
    .then((task)=>{
        task ? res.status(200).json({task}) :  res.status(404).json({msg:`${req.params.id} does not exis ! `});
    })
    .catch(err=>{
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


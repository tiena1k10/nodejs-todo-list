const userModel = require('../models/user-model');
const statusCode = require("http-status-codes");
const jwt = require("jsonwebtoken");
const login = (req,res)=>{
    res.send("login")
}

const register = (req,res)=>{
    const {name, email,password} = req.body;
    if(!name||!email||!password){
        res.status(500).json({msg:"please provide name, email, password"})
    }
    userModel.create({name,email,password})
    .then(user=>{
        res.status(statusCode.CREATED).json({msg:"success",user});
    })
    .catch(err=>{
        console.log("err : ",err);
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({err});
    })
}

module.exports = {
    login,register
}
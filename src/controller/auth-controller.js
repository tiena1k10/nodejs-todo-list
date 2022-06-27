const userModel = require('../models/user-model');
const statusCode = require("http-status-codes");
const bcrypt = require('bcryptjs/dist/bcrypt');
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(500).json({ msg: "please provide name, email, password" })
    }
    // userModel.findOne({ email })
    //     .then(user => {
    //         if (!user)
    //             res.status(500).json({ msg: "Email is invalid" });
    //         return user.comparePassword(password);
    //     })
    //     .then(isMatch => {
    //         if (isMatch) {
    //             const token = user.createToken();
    //             return res.status(statusCode.CREATED).json({ msg: "success", user: { name: user.name }, token });
    //         }
    //     })
    //     .catch(err => {
    //         res.status(500).json({ err });
    //     })
    const user = await userModel.findOne({ email });
    if (!user)
        return res.status(500).json({ msg: "Email is invalid" });
    //const isMatch = await bcrypt.compare(password, user.password);
    const isMatch = await user.comparePassword(password);
    if (!isMatch)
        return res.status(500).json({ err: "password is not match" });
    const token = user.createToken();
    return res.status(statusCode.CREATED).json({ msg: "success", user: { name: user.name }, token });

}

const register = (req, res) => {
    console.log("dang ki");
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(500).json({ msg: "please provide name, email, password" })
    }
    userModel.create({ name, email, password })
        .then(user => {
            const token = user.createToken();
            return res.status(statusCode.CREATED).json({ msg: "success", user: { name: user.name }, token });
        })
        .catch(err => {
            console.log("err : ", err);
            return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ err });
        })
}

module.exports = {
    login, register
}
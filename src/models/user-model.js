const mongooes = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = mongooes.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minlenght: 3,
        maxlenght: 50,
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "please provide valid email"],
        unique: [true, '$VALUE has been exis'],
        minlenght: 3,
        maxlenght: 50,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlenght: 6,
    },
},
    {
        timestamps: true
    }
);

// never dung` arrow function trong model
userSchema.pre("save", function (next) {
    bcrypt.genSalt(10)
        .then(salt => {
            return bcrypt.hash(this.password, salt)
        })
        .then(result => {
            this.password = result;
            next();
        })
        .catch(err => next(err));
});
userSchema.methods.createToken = function () {
    // return jwt.sign({ userId: this._id, userName: this.name }, "SECRETSTRING", {
    //     expiresIn: '3d',
    // })
    return jwt.sign({ userId: this._id, userName: this.name }, "SECRETSTRING", {
        expiresIn: '3d',
    })
}
userSchema.methods.comparePassword = async function (pass) {
    return await bcrypt.compare(pass, this.password);

}
module.exports = mongooes.model("users", userSchema);


const mongooes = require("mongoose");

const jobSchema = new mongooes.Schema({
    company: {
        type: String,
        required: [true, 'please provide company name'],
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, 'please provide position '],
        maxlength: 100,
    },
    status: {
        type: String,
        enum: ["interview", "declined", "pending"],
        default: "pending"
    },
    createdBy: {
        type: mongooes.Types.ObjectId,
        ref: "User",
        required: [true, "please provide user"]
    }
},
    {
        timestamps: true
    }
);

module.exports = mongooes.model("Job", jobSchema);
const mongoose = require('mongoose')
 

const TaskSchema = mongoose.Schema(
   {
       name : {
           type: String,
           required: [true,'Required Name'],
           trim: true,
           maxLength:[50,'name can\'t not be more than 50 charecters ']

       },
       completed: {
           type: Boolean,
           default:false,
       },
   }
)


module.exports = mongoose.model("Tasks",TaskSchema);
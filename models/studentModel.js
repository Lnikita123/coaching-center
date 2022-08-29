const mongoose = require('mongoose')
let ObjectId = mongoose.Schema.Types.ObjectId

const studentSchema = new mongoose.Schema({

    mobile: {
        type:String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true
    },
    slot: {
        type: String,
        //required: true,
        enum: ["9 to 11", "2 to 4", "6 to 8"]
    }
  
}, {timestamps: true})

module.exports = mongoose.model("student", studentSchema)
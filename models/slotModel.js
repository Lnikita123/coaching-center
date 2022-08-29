const mongoose = require('mongoose')


const slotSchema = new mongoose.Schema({

    mobile: {
        type: String, 
      //  required: true, 
      //  unique: true
    },
    slot: {
        type: String,
        //required: true,
        enum: ["9 to 11", "2 to 4", "6 to 8"]
    }
   

}, {timestamps: true})

module.exports = mongoose.model("slot", slotSchema)
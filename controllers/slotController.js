const slotModel = require("../models/slotModel");
const validator = require("../validator/validation")

const createSlot = async function (req, res){
    try{
        data = req.body
        const {mobile, slot}= data

        if (!mobile){
            return res.status(400).send({status: false, msg: "Please provide mobile Number."})
        }

        if (!/^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/.test(mobile)) {
            return  res.status(400).send({ status: false, msg: "It's not a valid mobile number" })
        }

        const uniqueMobile = await slotModel.findOne({mobile:mobile})
        if (uniqueMobile){
            return res.status(400).send({status: false, msg: "Mobile Number is already registered."})
        }

        if (!slot){
            return res.status(400).send({status: false, msg: "Please provide slot."})
        }

        if (!validator.isValidTitle(slot)){
            return res.status(400).send({status: false, msg: "Please provide slot."})
        }

        let saveData= await slotModel.create(data)
        res.status(201).send({status: true, msg: "successfully created", data: saveData})
    }
    catch(err){
        console.log(err)
        res.status(500).send({status:false, msg: err.message})
    }
}

module.exports.createSlot= createSlot

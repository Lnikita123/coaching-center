const studentModel = require("../models/studentModel")
const slotModel = require("../models/slotModel")
const validator = require("../validator/validation")


const createUser = async function (req, res){
    try{
        let data = req.body
        const {mobile, name, age} = data

        if (!mobile){
            return res.status(400).send({status: false, msg: "Please provide mobile Number."})
        }

        const uniqueMobile = await studentModel.findOne({mobile:mobile})
        if (uniqueMobile){
            return res.status(400).send({status: false, msg: "Mobile Number is already registered."})
        }

        const newMobile = await slotModel.findOne({mobile:mobile})
            if (!newMobile){
                return res.status(400).send({status: false, msg: "Firstly signup with your phone"})
        }

        if(!name){
            return res.status(400).send({status:false, msg: "Please enter your name"})
        }
        if(!age){
            return res.status(400).send({status:false, msg: "Please enter your age"})
        }

        let saveData = await studentModel.create(data)
        res.status(201).send({status:true, msg: "successfully created", data:saveData })
    } 
    catch(err){
        console.log(err)
        res.status(500).send({status:false, msg: err.message})
    }
}


const getSlots= async function(req, res){
    try{
        let queryParams= req.body

        const {slot, mobile} = queryParams

        if (!mobile){
            return res.status(400).send({status: false, msg: "Please provide mobile Number."})
        }

        if (validator.isValid(slot)){
          queryParams["slot"]= slot.trim()
        }

        const newMobile = await slotModel.findOne({mobile:mobile})
        if (!newMobile){
            return res.status(400).send({status: false, msg: "Firstly signup with your phone"})
        }
        
        const details = await studentModel.find({...queryParams})
        res.status(200).send({status:true, message: "records", data: details})
    }
    catch(err){
        console.log(err)
        res.status(500).send({status:false, msg: err.message})
    }
}


const updateDetails = async function (req, res) {
    try {
      let requestBody = req.body;
      const { mobile, name, age } = requestBody;
  
      if (!validator.isValidRequestBody(req.params)) {
        return res.status(400).send({status: false, message: "Invalid request parameters. Please provide query details"});
      }
  
      if (!validator.isValidString(name)) {
        return res
          .status(400)
          .send({ status: false, message: "Title is required for updatation." });
      }
     
      if (!mobile){
        return res.status(400).send({status: false, msg: "Please provide mobile Number to update"})
    }
      
      if (!age){
        return res.status(400).send({status: false, msg: "Please provide age to update"})
    }
  
      if (
        req.body.mobile ||
        req.body.name ||
        req.body.age 
        
      ) {
        const name = req.body.name;
        const mobile = req.body.mobile;
        const age = req.body.age;
        
        const updatedBook = await studentModel.findOneAndUpdate(
          { mobile: req.params.mobile },
          {
            name: name,
            age: age,
            mobile: mobile,
           
          },
          { new: true }
        );
        
    
        return res.status(200).send({
          status: true,
          message: "Successfully updated book details",
          data: updatedBook,
        });
      } else {
        return res
          .status(400)
          .send({ status: false, msg: "Please provide book details to update" });
      }
    } catch (err) {
        console.log(err)
      res.status(500).send({
        status: false,
        Error: err.message,
      });
    }
};


const deleteUserById = async function (req, res) {
    try {
      let mobile = req.params.mobile
      
  
      if (!mobile) {
        return res.status(400).send({ status: false, message: `Mobile no is required` });
      }

      const user= await studentModel.deleteOne({mobile:mobile})
      return res.status(200).send({status: true,message: "successfully deleted the student",data:user});
    }
    catch (err){
        console.log(err)
      res.status(500).send({
        status: false,
        Error: err.message,
      });
    }
}
  


module.exports.createUser=createUser
module.exports.getSlots=getSlots
module.exports.updateDetails=updateDetails
module.exports.deleteUserById= deleteUserById
const express= require('express')
const router = express.Router()

const SlotController=  require("../controllers/slotController")
const StudentController = require("../controllers/studentController")
const Details = require("../controllers/studentController")
const UpdateDetails = require("../controllers/studentController")
const DeleteUser = require("../controllers/studentController")

router.post("/slot", SlotController.createSlot)
router.post("/student", StudentController.createUser)
router.get("/details", Details.getSlots)
router.put("/updateDetails/:mobile", UpdateDetails.updateDetails)
router.delete("/deleteStudent/:mobile", DeleteUser.deleteUserById)

module.exports= router ;
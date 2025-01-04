const express = require("express")
const router = express.Router();

const {createAttendance} =require("../controllers/AttentenceController")

          
router.post('/', createAttendance);              
    


module.exports = router;




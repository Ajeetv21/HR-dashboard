const express = require("express")
const router = express.Router();

const {updateAttendanceStatus,deleteAttendance,getAllAttendance,createAttendance,updateAttendanceTask} =require("../controllers/AttendanceController")

 router.post('/attendance',createAttendance)         
router.put('/attendance/update/status/:id', updateAttendanceStatus);              
router.put('/attendance/update/task/:id', updateAttendanceTask);              
router.delete('/attendance/:id',deleteAttendance)
router.get('/attendance',getAllAttendance)

    


module.exports = router;




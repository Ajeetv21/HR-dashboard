const express = require("express")
const router = express.Router();

const { updateAttendanceStatus, deleteAttendance, getAllAttendance, createAttendance, updateAttendanceTask, searchAttendanceStatus } = require("../controllers/AttendanceController")

router.post('/attendance', createAttendance)
router.put('/attendance/update/status/:id', updateAttendanceStatus);
router.put('/attendance/update/task/:id', updateAttendanceTask);
router.delete('/attendance/:id', deleteAttendance)
router.get('/attendance', getAllAttendance)
router.get('/attendance/search', searchAttendanceStatus)




module.exports = router;




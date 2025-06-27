const express = require("express")
const router = express.Router();

const {createLeave,updateStatus, getAllLeaves,searLeaveStatus} = require("../controllers/LeavesControllers")
const authMiddleware = require("../middlewares/authMiddleware")
const upload= require("../middlewares/upload")

router.get('/getleave',getAllLeaves)
router.post('/createLeave', upload.single('file'), createLeave);
router.put('/lv/update/:id',upload.none(),authMiddleware,updateStatus)
router.get('/leave/search/status',searLeaveStatus)


module.exports = router;


const express = require("express")
const router = express.Router();

const {createLeave,updateStatus, getAllLeaves} = require("../controllers/LeavesControllers")
const authMiddleware = require("../middlewares/authMiddleware")
const upload= require("../middlewares/upload")

router.get('/getleave',getAllLeaves)
router.post('/createLeave',authMiddleware,upload.single('file'),createLeave)
router.put('/lv/update/:id',upload.none(),authMiddleware,updateStatus)


module.exports = router;


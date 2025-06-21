const express = require("express")
const router = express.Router();

const {createLeave,updateStatus} = require("../controllers/LeavesControllers")
const authMiddleware = require("../middlewares/authMiddleware")
const upload= require("../middlewares/upload")


router.post('/createLeave',authMiddleware,upload.single('file'),createLeave)
router.post('/leave/status/update/:id',upload.none(),authMiddleware,updateStatus)


module.exports = router;


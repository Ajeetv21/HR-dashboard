const express = require("express")
const router = express.Router();

const {getProfileByUserId,updateProfile} = require("../controllers/profileController")
const  authMiddleware= require("../middlewares/authMiddleware")
const upload = require('../middlewares/upload')



router.get('/profile/:userId',authMiddleware, getProfileByUserId);
router.put('/profile/:userId', authMiddleware,upload.single('image'), updateProfile);


module.exports = router;


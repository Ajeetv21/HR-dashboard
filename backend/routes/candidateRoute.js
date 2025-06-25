const express = require("express")
const router = express.Router();
const upload = require("../middlewares/upload")

const authMiddleware = require('../middlewares/authMiddleware')
const {createCandidate,getAllCandidate,deleteCandidate,getByIdCandidate,updateCandidate}  = require("../controllers/candidateController")


//  candiates routes
router.post("/createCandidate",authMiddleware,upload.single('file'),createCandidate);
router.put("/candidate/update/:id",upload.none(),authMiddleware,updateCandidate)
router.get("/allCandidates",authMiddleware,getAllCandidate);
router.get("/candidate/:id",authMiddleware,getByIdCandidate);
router.delete("/candidates/:id",authMiddleware,deleteCandidate);



module.exports = router;


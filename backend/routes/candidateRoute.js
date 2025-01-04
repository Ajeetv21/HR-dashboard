const express = require("express")
const router = express.Router();

const multer = require("multer")

// Configure Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "./files");
  },
  filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
      cb(null, uniqueSuffix + file.originalname);
  },
});
const upload = multer({ storage: storage });

const {createCandidate,getAllCandidate,deleteCandidate,getByIdCandidate}  = require("../controllers/candidateController")
router.post("/createcandidate",upload.single('file'),createCandidate);
router.get("/candidates",getAllCandidate);
router.get("/candidate",getByIdCandidate);
router.delete("/candidats/:id",deleteCandidate);



module.exports = router;


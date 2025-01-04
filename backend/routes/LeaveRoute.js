const express = require("express")
const router = express.Router();

const {addLeave,updateLeave,getEmployeeById,getAllEmployees,Approved}  = require("../controllers/LeaveController")

router.post("/add",addLeave);
router.get("/getAllEmployee",getAllEmployees);
router.get("/getAll/:id",getEmployeeById);
router.post("/update-leave/:id",updateLeave);
router.patch("/leaves/:id")
router.get("/api/leave",Approved)


module.exports = router;

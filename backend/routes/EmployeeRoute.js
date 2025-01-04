const express = require("express")
const router = express.Router();

const {getEmployees,getEmployeeById,updateEmployee,deleteEmployee}  = require("../controllers/EmpController")

          
router.get('/', getEmployees);              
router.get('/:id', getEmployeeById);        
router.put('/update/:id',updateEmployee);         
router.delete('/:id',deleteEmployee);     


module.exports = router; 
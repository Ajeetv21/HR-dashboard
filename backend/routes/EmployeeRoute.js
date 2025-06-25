const express = require("express")
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const { getEmployees, getEmployeeById, updateEmployee, deleteEmployee, searchEmployee } = require("../controllers/EmpController")


router.get('/employees', getEmployees);
router.get('/employee/:id', getEmployeeById);
router.put('/employee/:id', updateEmployee);
router.delete('/employee/:id', deleteEmployee);
router.get('/emp/search', searchEmployee)


module.exports = router; 
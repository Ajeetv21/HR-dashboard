const Employee = require('../models/EmployeeModel');

// READ All Employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employees.' });
    }
};

// READ Single Employee
exports.getEmployeeById = async (req, res) => {
    try {
        
        const employee = await Employee.findOne({_id:req.params.id});
        if (!employee) return res.status(404).json({ message: 'Employee not found.' });
        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employee.' });
    }
};

// UPDATE Employee
exports.updateEmployee = async (req, res) => {
    let result = await Employee.updateOne(
        {_id:req.params.id},
        {$set:req.body}
    )
    res.send(result)
};

// DELETE Employee
exports.deleteEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) return res.status(404).json({ message: 'Employee not found.' });
        res.status(200).json({ message: 'Employee deleted successfully.' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete employee.' });
    }
};

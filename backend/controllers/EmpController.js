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
        const employee = await Employee.find({_id:req.params.id});
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// UPDATE Employee
exports.updateEmployee = async (req, res) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!employee) {
            return res.status(404).json({ success: false, message: "Employee not found" });
        }
        res.status(200).json({ success: true, data: employee });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
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

exports.searchEmployee = async (req,res)=>{
try {
    const name = req.query.name;
    console.log(name)
    const employees = await Employee.find({
      EmployeeName: { $regex: name, $options: 'i' }, 
    });
    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.searchEmployeePosition = async (req, res) => {
  try {
    const { position } = req.query;
    let query = {};
    if (position) query.position = position;
   

    const employee = await Employee.find(query);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
exports.searchEmployeeStatus = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status) query.status = status;
   

    const employee = await Employee.find(query);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};






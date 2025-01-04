const Employee =require("../models/EmployeeModel")
const Attendence = require("../models/AttendenceModel")

exports.createAttendance = async (req, res) => {
    const { employeeId, status } = req.body;
    const newAttendence = new Attendence({employeeId,status})
    await newAttendence.save()
    res.json(newAttendence);
   
};
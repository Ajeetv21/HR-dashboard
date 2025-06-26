const mongoose = require('mongoose');
const Leave = require("./LeaveModel")
const employeeSchema = new mongoose.Schema({
    EmployeeName: { type: String },
    email: { type: String },
    phone: { type: Number },
    position: {
        type: String,
        enum: ['Intern', 'Full Time', 'Junior', 'senior', 'Team Lead']
    },
    department: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['Present', "Absent",'Medical Leave','Work from Home'],
        default: "Present",

    },
    tasks: {
        type: String,
        default: null
    },


    date: { type: Date, default: Date.now() },


}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);

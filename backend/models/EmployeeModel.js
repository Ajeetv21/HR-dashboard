const mongoose = require('mongoose');
const Leave = require("./LeaveModel")
const employeeSchema = new mongoose.Schema({
    EmployeeName: { type: String},
    email: { type: String },
    phone: { type: String },
    position: { 
        type:String,
         enum: ['Designer Intern', 'Developer', 'Human Resources', 'Designer Full time', 'Developer Full time']
         },
         department:{
            type:String,
            default:null
         },

date: { type: Date, default: Date.now },

}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);

const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' ,required:true},
    department: { type: String, required: true },
    role: { type: String, required: true },
    tasks: { type: String, required: true },
    status: { 
                type: String, 
                enum: ['Present', 'Absent', 'Medical Leave', 'Work From Home'], 
                required: true

            },

});

module.exports = mongoose.model('Attendence', attendanceSchema);

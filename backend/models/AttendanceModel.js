const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({

    employee: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    tasks: { type: String,},
    status: { 
                type: String, 
                enum: ['Present',"Absent","Medical Leave","Work from Home"], 

        },

});

module.exports = mongoose.model('Attendance', attendanceSchema);

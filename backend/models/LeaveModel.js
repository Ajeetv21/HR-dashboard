const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
    },
    LeaveDate: { type: String },

    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    file: { type: String }

});

module.exports = mongoose.model('Leave', leaveSchema);




const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
  fullname: {
    type: String,
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
    startDate: { type: String },

    status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
    document: String,


});

module.exports = mongoose.model('leave', leaveSchema);

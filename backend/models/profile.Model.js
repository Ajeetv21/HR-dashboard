const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
    image: {
        type: String,
        default: ''
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
}, { timestamps: true });

module.exports = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);

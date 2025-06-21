const Profile = require("../models/profile.Model")


exports.getProfileByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const profile = await Profile.findOne({ userId }).populate('userId');
        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Profile fetched successfully',
            data: profile
        });
    } catch (error) {
        console.error('Error fetching profile:', error.message);
        return res.status(500).json({
            success: false,
            message: 'Server Error',
            error: error.message
        });
    }
};



exports.updateProfile = async (req, res) => {
    try {
        const { userId } = req.params;
       

       
        const profile = await Profile.findOne({ userId });
        if (!profile) {
            return res.status(404).json({ success: false, message: 'Profile not found' });
        }

        if (req.file) {
            profile.image = `/uploads/${req.file.filename}`; 
        }

        const updatedProfile = await profile.save();

        return res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            data: updatedProfile
        });
    } catch (error) {
        console.error('Error updating profile:', error.message);
        return res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

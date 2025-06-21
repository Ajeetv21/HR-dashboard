const Employee = require("../models/EmployeeModel")
const Attendance = require("../models/AttendanceModel")


exports.getAllAttendance = async (req, res) => {
    try {
        // Correct field name
        const attendances = await Attendance.find().populate('employeeId');

        res.status(200).json({
            success: true,
            data: attendances
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching attendance records',
            details: error.message
        });
    }
};
exports.updateAttendanceStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status} = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required' });
        }
        

        const attendance = await Attendance.findById(id);

        if (!attendance) {
            return res.status(404).json({ success: false, message: 'Attendance record not found' });
        }

        attendance.status = status; 
   

        const updatedAttendance = await attendance.save();

        res.status(200).json({
            success: true,
            message: ' status updated successfully',
            data: updatedAttendance
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating status', details: error.message });
    }
};

exports.updateAttendanceTask = async (req, res) => {
    try {
        const { id } = req.params; 
        const { tasks } = req.body;

        if (!tasks) {
            return res.status(400).json({ success: false, message: 'Task is required' });
        }

        const attendance = await Attendance.findById(id);

        if (!attendance) {
            return res.status(404).json({ success: false, message: 'Attendance record not found' });
        }
        attendance.tasks = tasks;

       
        const updatedAttendance = await attendance.save();

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data: updatedAttendance
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating task', details: error.message });
    }
};

exports.deleteAttendance = async (req, res) => {
    try {
        const { id } = req.params;

        const attendance = await Attendance.findByIdAndDelete(id);

        if (!attendance) {
            return res.status(404).json({ success: false, message: 'Attendance record not found' });
        }

        res.status(200).json({
            success: true,
            message: 'Attendance record deleted successfully'
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error deleting attendance', details: error.message });
    }
};

exports.createAttendance = async (req, res) => {
    try {
        const { employee, tasks, status } = req.body;

        const attendance = await Attendance.create({
            employee: employee,
            tasks:tasks,
            status:status,
        });

        res.status(201).json({ success: true, message: 'Attendance Marked Successfully', data: attendance });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


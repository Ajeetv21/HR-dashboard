const Leave = require("../models/LeaveModel")

exports.createLeave = async (req, res) => {
    try {
        const { employeeId, reason, designation, LeaveDate, status } = req.body;


        if (!employeeId || !reason || !designation || !LeaveDate || !status) {
            return res.status(404).json({
                success: false,
                message: 'all field required'
            });
        }
        const leave = new Leave({
            employeeId,
            reason,
            designation,
            LeaveDate,
            status,
            file: req.file.path,
        });

        const result = await leave.save();

        return res.status(201).json({
            success: true,
            message: 'leave created successfully',
            data: result
        });




    } catch (error) {
        console.log(error.message)
    }
};


exports.updateStatus = async (req, res) => {
    try {
        const { id } = req.params; 
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ success: false, message: 'status  is required' });
        }

        const leave = await Leave.findById(id);

        if (!leave) {
            return res.status(404).json({ success: false, message: 'leave record not found' });
        }
        leave.status = status;

       
        const updatedLeaveStatus = await leave.save();

        res.status(200).json({
            success: true,
            message: 'Task updated successfully',
            data:updatedLeaveStatus
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating task', details: error.message });
    }
};
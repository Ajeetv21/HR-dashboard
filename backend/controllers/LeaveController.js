  const LeaveModel = require("../models/LeaveModel")

exports.addLeave = async (req, res) => {
  const leave = new LeaveModel(req.body);
    let result =  await leave.save();
res.send("created it")
}

exports.updateLeave = async (req, res) => {
  let result = await LeaveModel.updateOne(
      {_id:req.params.id},
      {$set:req.body}
  )
  res.send(result)
};

exports.getEmployeeById = async (req, res) => {
  try {
      
      const leave = await LeaveModel.findById({_id:req.params.id});
      if (!leave) return res.status(404).json({ message: 'Employee not found.' });
      res.status(200).json(leave);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch employee.' });
  }
};


exports.UpdateStatus = async (req,res)=>{
  try {
    const leave =await  LeaveModel.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, updatedAt: Date.now() },
       { new: true }
    )
    if (!leave) return res.status(404).json({ error: 'Leave not found' });
    res.json(leave);
  } catch (error) {
    console.log(error.message)
  }
}

exports.getAllEmployees = async (req, res) => {
  try {
      const Leaves = await LeaveModel.find();
      res.status(200).json(Leaves);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch employees.' });
  }
};

exports.Approved = async (req, res) => {
  try {
    const { date } = req.query;

    const query = { status: 'approved' };
    if (date) {
      const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      query.startDate = { $gte: startOfDay, $lte: endOfDay };
    }

    const leaves = await Leave.find(query);
    res.json(leaves);
  } catch (error) {
      res.status(500).json({ error: 'Failed to fetch employees.' });
  }
};


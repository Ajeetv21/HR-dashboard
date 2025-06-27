const Candidate = require("../models/CandidateModel")

exports.getAllCandidate = async (req, res) => {

    try {
        const candidates = await Candidate.find({});
       

         return res.status(201).json({
            success: true,
            message: 'Candidate created successfully',
            data: candidates
        });

    } catch (error) {

     res.status(500).json({ success: false, message: 'Error fetching All  candidate', details: error.message });
 
    }

}
exports.getByIdCandidate = async (req, res) => {

   try {
     const candidate = await Candidate.findById(req.params.id);
    
         return res.status(201).json({
            success: true,
            message: 'Candidate created successfully',
            data: candidate
        });
    
   } catch (error) {
     res.status(500).json({ success: false, message: 'Error fetching single  candidate', details: error.message });
   }

}

exports.createCandidate = async (req, res) => {
    try {
       const { name, email, phone, status, position, experience } = req.body;
       
        if (!name || !email || !phone || !status || !position || !experience) {
            return res.status(400).json({ success: false, message: 'All fields and file are required' });
        }
           
        const candidate = new Candidate({
            name,
            email,
            phone,
            position,
            status,
            experience,
            file: req.file.path, 
        });

        const result = await candidate.save();

        return res.status(201).json({
            success: true,
            message: 'Candidate created successfully',
            data: result
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error creating candidate', details: error.message });
    }
};




exports.deleteCandidate = async (req, res) => {

    try {
        let result = await Candidate.deleteOne({ _id: req.params.id })

        return res.status(200).json({
            success: true,
            message: ' candidate deleted successfully',
            data: result
        });

    } catch (error) {
        res.status(500).json({ error: "Error deleted candidate", details: error.message });
    }

}


exports.updateCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const { status} = req.body;
       

        if (!status) {
            return res.status(400).json({ success: false, message: 'Status is required' });
        }
        

        const candidate = await Candidate.findById(id);

        if (!candidate) {
            return res.status(404).json({ success: false, message: 'candidate record not found' });
        }

        candidate.status = status; 
   

        const updatedCandidate = await candidate.save();

        res.status(200).json({
            success: true,
            message: ' status updated successfully',
            data: updatedCandidate
        });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating status', details: error.message });
    }
};

exports.getCandidate = async (req, res) => {
    try {
        let result = await Candidate.findById({ _id: req.params.id })
        return res.status(200).json({
            success: true,
            message: 'fetch candidate successfully',
            data: result
        });
    } catch (error) {
        res.status(500).json({ error: " fetching Error  candidate", details: error.message });
    }
}





exports.searchCandidate = async (req, res) => {
  try {
    const { position, status } = req.query;
    let query = {};
    if (position) query.position = position;
    if (status) query.status = status;

    const candidate = await Candidate.find(query);
    res.status(200).json(candidate);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

exports.searchByNameCandidate = async (req,res)=>{
    try {
      const name = req.query.name;

      const candidate = await Candidate.find({
            name: { $regex: name, $options: 'i' }, 
          });
          res.status(200).json(candidate);
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}







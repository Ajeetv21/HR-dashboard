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
             // Create new candidate
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






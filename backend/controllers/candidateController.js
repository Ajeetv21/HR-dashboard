const Candidate = require("../models/CandidateModel")

exports.getAllCandidate = async (req,res)=>{

        const candidates = await Candidate.find({});
        res.status(201).json(candidates);

        
       
}
exports.getByIdCandidate = async (req,res)=>{

    const candidate = await Candidate.findById(req.params.id);
    res.json(candidate);
    
}

exports.createCandidate = async (req,res)=>{
    
    try {
       
    const {name, email, phone, status,position,experience}=req.body;
    const candidate = new Candidate({
        name,
        email,
        phone,
        position,
        status,
        experience,
        file:req.file.path,
    })
const result = await candidate.save();

    console.log(result.json())
        
    } catch (error) {
        res.status(500).json({ error: "Error creating candidate", details: error.message });
        
    }
}




exports.deleteCandidate = async (req,res)=>{
   
    let result = await Candidate.deleteOne({_id:req.params.id})
    res.send(req.params)
    
}




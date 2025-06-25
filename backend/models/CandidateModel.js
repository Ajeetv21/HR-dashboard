const mongoose = require('mongoose');
const Employee = require("./EmployeeModel")
const Attendance = require("./AttendanceModel")
const candidateSchema = new mongoose.Schema({

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    position: {
        type: String,

        enum: ['Designer Intern', 'Developer', 'Human Resources', 'Designer Full time', 'Developer Full time']
    },
    status: {
        type: String,

        enum: ['New', 'Scheduled', 'Selected', 'Pending', 'ongoing'],
        required: true,
        default:'New',
    },
    experience: { type: String },
    file: { type: String }
}, { timestamps: true });



candidateSchema.post('save', async function (doc) {
    if (doc.status === 'Selected') {
        const existingEmployee = await Employee.findOne({ email: doc.email });

        if (!existingEmployee) {
            const newEmployee = new Employee({
                EmployeeName: doc.name,
                email: doc.email,
                phone: doc.phone,

            });

            await newEmployee.save();
            console.log('Candidate promoted to Employee!');
        } else {
            console.log('Employee already exists!');
        }
    }
});



module.exports = mongoose.model('Candidate', candidateSchema);

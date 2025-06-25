import React, { useState, useEffect } from 'react';
import CloseCircle from "../../assets/icons/close-circle.svg";
import "./editEmployee.css";

function EditEmployeeModal({ employee, isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        EmployeeName: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        date:''
    });

    console.log(formData.date)
    useEffect(() => {
        if (employee) {
            setFormData({
                EmployeeName: employee.EmployeeName,
                email: employee.email,
                phone: employee.phone,
                position: employee.position,
                department: employee.department,
                date:employee.date,
            });
        }
    }, [employee]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(employee._id, formData);
    };

    if (!isOpen) return null;

    return (
        <div style={styles.overlay}>
            <div className='popup-model'>
                <div className="heading">
                    <p>Edit Employee</p>
                    <button id="close" onClick={onClose}>
                        <img src={CloseCircle} alt="close" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="EmployeeName"
                            value={formData.EmployeeName}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Phone:</label>
                        <input
                            type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div>
                        <label>Position:</label>
                        <select
                            name="position"
                            value={formData.position}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Position</option>
                            <option value="Intern">Intern</option>
                            <option value="Full Time">Full Time</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                            <option value="Team Lead">Team Lead</option>
                        </select>
                    </div>

                    <div>
                        <label>Department:</label>
                        <input
                            type="text"
                            name="department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Date of joining:</label>
                        <input
                            type="date"
                            name="date"
                              value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="buttonGroup" >
                        <button type="submit">Save</button>
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default EditEmployeeModal;

const styles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    }
};

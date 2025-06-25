import React, { useState, useEffect } from 'react';
import CloseCircle from "../../assets/icons/close-circle.svg";
import "./editEmployee.css";

function EditAttendanceModel({ employee, isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        EmployeeName: '',
        email: '',
        phone: '',
        position: '',
        department: '',
        date: '',
        tasks:''
    });

    console.log(formData.date)
    useEffect(() => {
        if (employee) {
            setFormData({
                position: employee.position,
                department: employee.department,
                tasks:employee.tasks
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
                    <p>Edit Attendance</p>
                    <button id="close" onClick={onClose}>
                        <img src={CloseCircle} alt="close" />
                    </button>
                </div>

                <form onSubmit={handleSubmit}>
                  
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
                        <label>Tasks:</label>
                        <input
                            type="text"
                            name="tasks"
                            value={formData.tasks}
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

export default EditAttendanceModel;

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

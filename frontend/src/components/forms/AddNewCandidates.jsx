import React, { useState } from "react";
import DashBoard from "../DashBoard";
import Candidates from "../../pages/Candidates";
import Button from "../reusableComponent/button";
import "./AddNewCandidates.css";
import CloseCircle from "../../assets/icons/close-circle.svg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createCandidate } from "../../features/auth/CandidateSlice";

function AddNewCandidates() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [position, setPosition] = useState("");
    const [status, setStatus] = useState("New");
    const [experience, setExperience] = useState("");
    const [file, setFile] = useState(null);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(createCandidate({ name, email, phone, position, status, experience, file }));
        } catch (error) {
            console.log(error.message);
        }

        
        setName("");
        setEmail("");
        setPhone("");
        setPosition("");
        setStatus("New");
        setExperience("");
        setFile(null);
    };

    return (
        <div className="candidatePage">
            <DashBoard tag={<Candidates />} />
            <div className="background"></div>

            <div className="popUp">
                <div className="heading">
                    <p>Add New Candidate</p>
                    <Link to="/dashboard/candidate">
                        <button id="save">
                            <img src={CloseCircle} alt="closeCircle" />
                        </button>
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Phone:</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Experience:</label>
                        <input
                            type="text"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            required
                        />
                    </div>
                    <div className="select">
                        <label>Position:</label>
                        <select
                            value={position}
                            onChange={(e) => setPosition(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Select Position
                            </option>
                            <option value="Designer Intern">Designer Intern</option>
                            <option value="Developer">Developer</option>
                            <option value="Human Resources">Human Resources</option>
                            <option value="Designer Full time">Designer Full time</option>
                            <option value="Developer Full time">Developer Full time</option>
                        </select>
                    </div>
                    <div>
                        <label>Status:</label>
                        <select value={status} onChange={(e) => setStatus(e.target.value)}>
                            <option value="New">New</option>
                            <option value="Scheduled">Scheduled</option>
                            <option value="Selected">Selected</option>
                            <option value="Pending">Pending</option>
                            <option value="Ongoing">Ongoing</option>
                        </select>
                    </div>
                    <div className="btn-resume">
                        <label>Resume:</label>
                        <input
                            type="file"
                            name="file"
                            onChange={(e) => setFile(e.target.files[0])}
                            required
                        />
                    </div>

                    <div className="bottom">
                        <p style={{ color: "grey" }}>
                            I hereby declare that the above information is true to the best of my knowledge and belief.
                        </p>
                        <Button text="Save" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddNewCandidates;

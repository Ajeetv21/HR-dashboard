import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

function DropdownMenu({ employeeId, onEdit, onDelete }) {
    const [open, setOpen] = useState(false);

    const handleEdit = () => {
        setOpen(false);
        if (onEdit) onEdit(employeeId);
    };

    const handleDelete = () => {
        setOpen(false);
        if (onDelete) onDelete(employeeId);
    };

    return (
        <div style={{ position: "relative" }}>
            <button
                style={{ background: "none", border: "none", cursor: "pointer" }}
                onClick={() => setOpen((prev) => !prev)}
                aria-label="Actions"
            >
                <BsThreeDotsVertical size={20} />
            </button>
            {open && (
                <div
                    style={{
                        position: "absolute",
                        right: 0,
                        top: "100%",
                        background: "#fff",
                        border: "1px solid #ddd",
                        borderRadius: 4,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                        zIndex: 10,
                        minWidth: 100,
                    }}
                >
                    <button
                        style={{
                            width: "100%",
                            padding: "8px 12px",
                            background: "none",
                            border: "none",
                            textAlign: "left",
                            cursor: "pointer",
                        }}
                        onClick={handleEdit}
                    >
                        Edit
                    </button>
                    <button
                        style={{
                            width: "100%",
                            padding: "8px 12px",
                            background: "none",
                            border: "none",
                            textAlign: "left",
                            color: "red",
                            cursor: "pointer",
                        }}
                        onClick={handleDelete}
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default DropdownMenu;

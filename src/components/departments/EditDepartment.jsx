import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditDepartment = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 

    const [department, setDepartment] = useState({ dep_name: "", description: "" });

    useEffect(() => {
        const fetchDepartment = async () => {
            if (id) {
                const token = localStorage.getItem('token'); 
                if (!token) {
                    alert("No token found, please login.");
                    return;
                }

                try {
                    const url = `http://localhost:5000/api/department/${id}`;
                    const response = await axios.get(url, {
                        headers: {
                            "Authorization": `Bearer ${localStorage.getItem('token')}`
                        }
                    });

                    if (response.data.success) {

                        setDepartment(response.data.department); 
                    } else {
                        alert(response.data.error || "Failed to fetch department");
                    }
                } catch (error) {
                    if (error.response) {
                        alert(error.response.data.error || "Error fetching department");
                    } else {
                        alert("An unexpected error occurred.");
                    }
                }
            }
        };
        fetchDepartment(); 
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target; 
        setDepartment({ ...department, [name]: value }); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        const token = localStorage.getItem('token'); 
        if (!token) {
            alert("No token found, please login.");
            return;
        }

        try {
            const response = await axios.put(`http://localhost:5000/api/department/${id}`, department, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (response.data.success) {
                navigate("/admin-dashboard/departments"); 
            } else {
                alert(response.data.error || "Failed to edit department");
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error || "Error editing department");
            } else {
                alert("An unexpected error occurred.");
            }
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h3 className="text-2xl font-bold mb-6">Edit department</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="dep_name" className="text-sm font-medium text-gray-700">Department Name</label>
                    <input
                        type="text"
                        name="dep_name"
                        placeholder="Enter dep name"
                        className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        value={department.dep_name} 
                        onChange={handleChange}
                    />
                </div>
                <div className="mt-3">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        name="description"
                        placeholder="Details"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                        value={department.description} 
                        onChange={handleChange} 
                    />
                </div>
                <button className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                    Edit department
                </button>
            </form>
        </div>
    );
};

export default EditDepartment;

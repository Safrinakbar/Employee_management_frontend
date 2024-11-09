import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddDepartment = () => {
  const [department, setDepartment] = useState({
    dep_name: '',
    description: ''
  });
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/department/add", department, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        }
      });
      console.log(localStorage.getItem('token'));

      if (response.data.success) {
        navigate("/admin-dashboard/departments");
      }
    } catch (error) {
      // Change alert to console log
      if (error.response && !error.response.data.success) {
        console.log(error.response.data.error); // Log the error instead of alerting
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
      <h3 className="text-2xl font-bold mb-6">Add department</h3>
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
          Add department
        </button>
      </form>
    </div>
  );
};

export default AddDepartment;
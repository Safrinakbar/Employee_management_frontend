import React, { useState } from "react";
import { useNavigate } from "react-router-dom"
import {useAuth} from "../../../server/context/authContext"
import axios from "axios"

const Setting = () =>{
    const navigate = useNavigate();
    const {user} = useAuth();
    const [setting,setSetting] = useState({
        userId: user._id,
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    })
    const [error,setError] = useState(null);

    const handleChange = (e) =>{
      const {name,value} = e.target;
      setSetting({...setting,[name]:value });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (setting.newPassword !== setting.confirmPassword) {
          setError("Password not matched");
      } else {
          try {
              const response = await axios.put("http://localhost:5000/api/setting/change-password", setting, {
                  headers: {
                      Authorization: `Bearer ${localStorage.getItem("token")}`,
                  },
              });
              console.log("Response from server:", response.data); // Log response
              if (response.data.success) {
                  console.log("Password changed successfully, navigating...");
                  navigate("/employee-dashboard");
                  setError("");
              }
          } catch (error) {
              console.log("Error occurred while changing password:", error); // Log the entire error
              if (error.response && !error.response.data.success) {
                  setError(error.response.data.error);
              } else {
                  setError("An unexpected error occurred");
              }
          }
      }
  }
  

      return(
        <div className="max-w-3l mx-auto mt-10 bg-white p-8 rounded-md shadow-md w-96">
            <h2 className="text-2xl font-bold mb-6">Change Password</h2>
            <p className="text-red-500">{error}</p>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="text-sm font-medium text-gray-700">Old Password</label>
                <input type="password" name="oldPassword" placeholder="Old password" onChange={handleChange} className="mt-1 w-full p-2 border border-gary-300 rounded-md" required/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">New Password</label>
                <input type="password" name="newPassword" placeholder="New password" onChange={handleChange} className="mt-1 w-full p-2 border border-gary-300 rounded-md" required/>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Confirm Password</label>
                <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={handleChange} className="mt-1 w-full p-2 border border-gary-300 rounded-md" required/>
              </div>
              <button type="submit" className="w-full mt-6 bg-teal-600 bg-teal-700 text-white font-bold py-2 px-4 rounded">Change Password</button>
            </form>
        </div>
      )
}

export default Setting
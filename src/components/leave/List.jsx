import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import axios from "axios";
import { useAuth } from "../../../../server/context/authContext";

const List = () => {

    const [leaves, setLeaves] = useState([]);
    const { id } = useParams(); 
    const {user} = useAuth()
    
    const fetchLeaves = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/leave/${id}/${user.role}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
            });
    
            console.log("API Response:", response.data);
    

            if(response.data.success){
               setLeaves(response.data.leave); 
            }
        } catch (error) {
            console.error("Error fetching leaves:", error); 
        }
    };
    
    useEffect(() => {
        fetchLeaves();
    }, []); 
    
 
    
    return (
        <div className="p-6">
            <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Leaves</h3>
            </div>
            <div className="flex justify-between items-center">
                <input type="text" placeholder="Search by Dep Name" className="px-4 py-0.5 border" />
                {user.role==="employee" && (
                <Link to="/employee-dashboard/add-leave" className="px-4 py-1 bg-teal-600 rounded text-white">Add new Leave</Link>)}
            </div>
            <table className="w-full text-sm text-left text-gray-500 mt-6">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                    <tr>
                        <th className="px-6 py-3">Sno</th>
                        <th className="px-6 py-3">Leave Type</th>
                        <th className="px-6 py-3">From</th>
                        <th className="px-6 py-3">To</th>
                        <th className="px-6 py-3">Description</th>
                        <th className="px-6 py-3">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {leaves.map((leave, index) => (
                <tr key={leave._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-6 py-3">{index + 1}</td>
                <td className="px-6 py-3">{leave.leaveType}</td>
                <td className="px-6 py-3">{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className="px-6 py-3">{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className="px-6 py-3">{leave.reason}</td>
                <td className="px-6 py-3">{leave.status}</td>
            </tr>
        ))}
</tbody>


            </table>
        </div>
    );
}

export default List;

import React, { useState,useEffect } from "react";
import DataTable from "react-data-table-component";
import { columns, LeaveButttons } from "../../utils/LeaveHepler";
import axios from "axios"

const Table = () =>{
    const [leaves,setLeaves] = useState([])
    const [filteredLeaves,setfilteredLeaves] = useState([])

    const fetchLeaves = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/leave', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            if (response.data.success) {
                const data = response.data.leaves.map((leave, index) => ({
                    _id: leave._id,
                    sno: index + 1,
                    employeeId: leave.employeeId.employeeId, // Assuming this is a string
                    name: leave.employeeId.userId.name, // Ensure `userId` has a `name`
                    leaveType: leave.leaveType,
                    department: leave.employeeId.department.dep_name, // Ensure `department` has a `dep_name`
                    days: Math.ceil((new Date(leave.endDate) - new Date(leave.startDate)) / (1000 * 3600 * 24)), // Calculate days correctly
                    status: leave.status,
                    action: <LeaveButttons Id={leave._id} />,
                }));
                setLeaves(data);
                setfilteredLeaves(data)
            }
        } catch (error) {
            if (error.response && !error.response.data.success) {
                alert(error.response.data.error);
            }
        }
    };
    
    useEffect(()=>{
       fetchLeaves();
    },[])


    const filterByInput =(e) =>{
         const data = leaves.filter(leave => leave.employeeId.toLowerCase().includes(e.target.value.toLowerCase()));
         setfilteredLeaves(data)
    }

    const filterByButton =(status) =>{
        const data = leaves.filter(leave => leave.status.toLowerCase().includes(status.toLowerCase()));
        setfilteredLeaves(data)
   }

    return(
        <>
        {leaves ? (
        <div className="p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold">Manage Leaves</h3>
                </div>
                <div className="flex justify-between items-center">
                   <input type="text" placeholder="Search by Emp Id" className="px-4 py-0.5 border" onChange={filterByInput} />
                   <div className="space-x-3">
                   <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700" onClick={()=> filterByButton("Pending")}>Pending</button>
                   <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700" onClick={()=> filterByButton("Approved")}>Approved</button>
                   <button className="px-2 py-1 bg-teal-600 text-white hover:bg-teal-700" onClick={()=> filterByButton("Rejected")}>Rejected</button>
                   </div>
                </div>

                <div className="mt-3">
                   <DataTable columns = {columns} data={filteredLeaves} pagination/>
                </div>
        </div>
    ): <div>Loading...</div>}

    </>
    )
}

export default Table
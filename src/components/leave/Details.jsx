import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Detail = () => {
  const { id } = useParams();
  const [leave, setLeave] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate()

  useEffect(() => {
    const fetchLeave = async () => {
      console.log(`Fetching leave with ID: ${id}`);
      try {
        const url = `http://localhost:5000/api/leave/detail/${id}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("Response received:", response.data);

        if (response.data.success) {
          setLeave(response.data.leave); // Check this key based on your actual response
          console.log("Leave state set:", response.data.leave);
        } else {
          console.error("Failed to fetch leave details:", response.data.error);
          alert(response.data.error || "Failed to fetch leave details");
        }
      } catch (error) {
        console.error("Error fetching leave:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLeave();
  }, [id]);

  const changeStatus = async(id, status) =>{
    try {
      const url = `http://localhost:5000/api/leave/${id}`;
      const response = await axios.put(url,{status}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Response received:", response.data);

      if (response.data.success) {
        navigate('/admin-dashboard/leaves')
      } else {
        console.error("Failed to fetch leave details:", response.data.error);
        alert(response.data.error || "Failed to fetch leave details");
      }
    } catch (error) {
      console.error("Error fetching leave:", error);
    } 
  }



  if (loading) {
    return <div style={{ textAlign: 'center', fontSize: '20px' }}>Loading.....</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', padding: '20px' }}>
      <div style={{ maxWidth: '600px', width: '100%', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)', backgroundColor: '#fff' }}>
        {leave ? (
          <>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Leave Details</h2>
            <div style={{ fontSize: '18px', lineHeight: '1.6', color: '#555', textAlign: 'justify' }}>
              <div><strong>Name:</strong> {leave.employeeId?.userId?.name}</div>
              <div><strong>Employee Id:</strong> {leave.employeeId?.employeeId}</div>
              <div><strong>Leave Type:</strong> {leave.leaveType}</div>
              <div><strong>Reason:</strong> {leave.reason}</div>
              <div><strong>Department:</strong> {leave.employeeId?.department?.dep_name || "N/A"}</div>
              <div>
                <p className="text-lg font-bold">{leave.status === "Pending" ? "Action" : "Status:"}</p>
                {leave.status === "Pending" ? (
                  <div className="flex space-x-2">
                    <button className="px-2 py-0.5 bg-teal-300 hover:bg-teal-400"
                      onClick={()=>changeStatus(leave._id,"Approved")} >Approve</button>
                    <button className="px-2 py-0.5 bg-red-300 hover:bg-red-400"
                        onClick={()=>changeStatus(leave._id,"Rejected")} >Reject</button>
                  </div>
                ) : (
                 <div> <strong>Status:</strong>{leave.status}</div>
                )}
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', fontSize: '20px', color: 'red' }}>No leave data found</div>
        )}
      </div>
    </div>
  );
};

export default Detail;

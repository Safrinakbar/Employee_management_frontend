import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const View = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true); // to manage loading state

  useEffect(() => {
    const fetchEmployee = async () => {
      console.log(`Fetching employee with ID: ${id}`);
      try {
        const url = `http://localhost:5000/api/employee/${id}`;
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("Response received:", response.data); 

        if (response.data.success) {
          setEmployee(response.data.employee);
          console.log("Employee data set successfully:", response.data.employee);
        } else {
          console.error("Failed to fetch employee:", response.data.error);
          alert(response.data.error || "Failed to fetch employee");
        }
      } catch (error) {
        console.error("Error fetching employee:", error); // Log the error
        if (error.response) {
          alert(error.response.data.error || "Error fetching employee");
        } else {
          alert("An unexpected error occurred.");
        }
      } finally {
        setLoading(false); // Stop loading after request
        console.log("Loading state set to false.");
      }
    };

    fetchEmployee();
  }, [id]); // Add `id` as a dependency

  if (loading) {
    console.log("Loading employee data...");
    return <div style={{ textAlign: 'center', fontSize: '20px' }}>Loading.....</div>;
  }

  // Log the image URL for debugging
  const imageUrl = `http://localhost:5000/${employee?.image}`;
  console.log(`Image URL: ${imageUrl}`);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // Full viewport height for centering
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '600px',
        width: '100%', // Ensure it takes full width of its container
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        backgroundColor: '#fff' // White background for contrast
      }}>
        {employee ? (
          <>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Employee Details</h2>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <img
                src={imageUrl}
                alt="Profile"
                onError={(e) => {
                  console.error("Error loading image, setting fallback:", e);
                  e.target.onerror = null; 
                  e.target.src = 'path/to/your/fallback/image.png'; // Set a fallback image
                }}
                style={{
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  border: '2px solid #4CAF50', // Green border
                  objectFit: 'cover', // Ensure image covers the area
                }}
              />
            </div>
            <div style={{
              fontSize: '18px',
              lineHeight: '1.6',
              color: '#555',
              textAlign: 'justify', // Justify text for better readability
            }}>
              <div style={{ padding: '5px 0' }}>
                <strong>Name:</strong> {employee.name}
              </div>
              <div style={{ padding: '5px 0' }}>
                <strong>Email:</strong> {employee.email}
              </div>
              <div style={{ padding: '5px 0' }}>
                <strong>Gender:</strong> {employee.gender}
              </div>
              <div style={{ padding: '5px 0' }}>
                <strong>Date of Birth:</strong> {new Date(employee.dob).toLocaleDateString()}
              </div>
              <div style={{ padding: '5px 0' }}>
                <strong>Marital Status:</strong> {employee.maritalStatus}
              </div>
              <div style={{ padding: '5px 0' }}>
                <strong>Designation:</strong> {employee.designation}
              </div>
              <div style={{ padding: '5px 0' }}>
                <strong>Department:</strong> {employee.department?.name || "N/A"}
              </div>
              <div style={{ padding: '5px 0' }}>
                <strong>Salary:</strong> ${employee.salary.toLocaleString()}
              </div>
              <div style={{ padding: '5px 0' }}>
                <strong>Role:</strong> {employee.role}
              </div>
            </div>
          </>
        ) : (
          <div style={{ textAlign: 'center', fontSize: '20px', color: 'red' }}>Employee not found</div>
        )}
      </div>
    </div>
  );
};

export default View;

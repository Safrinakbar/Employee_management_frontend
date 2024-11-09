import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const View = () => {
    const [salaries, setSalaries] = useState([]); // Start with an empty array
    const [filteredSalaries, setFilteredSalaries] = useState([]);
    const { id } = useParams();
    
    useEffect(() => {
        const fetchSalaries = async () => {
            try {
                const token = localStorage.getItem("token"); // Define token here
                const response = await axios.get(`http://localhost:5000/api/salary/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Response from API:", response);

                if (response.data.success) {
                    setSalaries(response.data.salary || []); // Use an empty array if salary is undefined
                    setFilteredSalaries(response.data.salary || []);
                } else {
                    setFilteredSalaries([]); // Clear filtered if there's an error
                }
            } catch (error) {
                console.error("Error fetching salaries:", error);
            }
        };

        fetchSalaries();
    }, [id]);

    const filterSalaries = (e) => {
        const q = e.target.value; // Get input value from event

        if (!salaries || salaries.length === 0) return; // Check for existence

        const filteredRecords = salaries.filter((salary) =>
            salary.employeeId?.toString().toLowerCase().includes(q.toLowerCase()) // Ensure employeeId is accessed correctly
        );
        setFilteredSalaries(filteredRecords);
    };

    return (
        <div className="overflow-x-auto p-5">
            <div className="text-center">
                <h2 className="text-2xl font-bold">Salary History</h2>
            </div>
            <div className="flex justify-end my-3">
                <input
                    type="text"
                    placeholder="Search By Emp ID"
                    className="border px-2 rounded-md py-0.5 border-gray-300"
                    onChange={filterSalaries}
                />
            </div>

            {filteredSalaries.length > 0 ? (
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border border-gray-200">
                        <tr>
                            <th className="px-6 py-3">Sno</th>
                            <th className="px-6 py-3">Emp ID</th>
                            <th className="px-6 py-3">Salary</th>
                            <th className="px-6 py-3">Allowance</th>
                            <th className="px-6 py-3">Deduction</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Pay date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredSalaries.map((salary, index) => (
                            <tr key={salary._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <td className="px-6 py-3">{index + 1}</td>
                                <td className="px-6 py-3">{salary.employeeId?.employeeId}</td>
                                <td className="px-6 py-3">{salary.basicSalary}</td>
                                <td className="px-6 py-3">{salary.allowances}</td>
                                <td className="px-6 py-3">{salary.deduction || "0.00"}</td> 
                                <td className="px-6 py-3">{salary.netSalary}</td>
                                <td className="px-6 py-3">{new Date(salary.payDate).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No salary records found.</div>
            )}
        </div>
    );
};

export default View;

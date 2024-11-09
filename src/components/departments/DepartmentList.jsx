import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { columns, DepartmentButtons } from "../../utils/departmenthelpers";
import axios from 'axios';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);
    const [depLoading, setDepLoading] = useState(false);

    useEffect(() => {
        const fetchDepartment = async () => {
            setDepLoading(true);
            try {
                const response = await axios.get('http://localhost:5000/api/department', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log(response.data);  
                if (response.data.success) {
                    const data = response.data.departments.map((dep, index) => ({
                        _id: dep._id,
                        sno: index + 1,
                        dep_name: dep.dep_name,
                        action: <DepartmentButtons _id={dep._id}/>
                    }));
                    setDepartments(data);
                }
            } catch (error) {
                console.error("Error fetching departments:", error);
                if (error.response && !error.response.data.success) {
                    alert(error.response.data.error);
                }
            } finally {
                setDepLoading(false);
            }
        };
        fetchDepartment();
    }, []);

    return (
        <>
            {depLoading ? <div>Loading...</div> :
                <div className="p-5">
                    <div className="text-center">
                        <h3 className="text-2xl font-bold">Manage Departments</h3>
                    </div>
                    <div className="flex justify-between items-center">
                        <input type="text" placeholder="Search by dep name" className="px-4 py-0.5 border" />
                        <Link to="/admin-dashboard/add-department" className="px-4 py-1 bg-teal-600 rounded text-white">Add New Department</Link>
                    </div>
                    <div>
                        <DataTable
                            columns={columns}
                            data={departments}
                        />
                    </div>
                </div>
            }
        </>
    );
};

export default DepartmentList;

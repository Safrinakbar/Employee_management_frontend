import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { columns, EmployeeButtons } from '../../utils/EmployeeHelper'; // Ensure columns are defined as above
import DataTable from 'react-data-table-component';
import axios from 'axios';

const List = () => {
  const [employees, setEmployees] = useState([]);
  const [empLoading, setEmpLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredEmployees,setFilteredEmployees]= useState([])

  useEffect(() => {
    const fetchEmployee = async () => {
      setEmpLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/api/employee', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.success) {
          const data = response.data.employees.map((emp, index) => ({
            _id: emp._id,
            sno: index + 1,
            dep_name: emp.department.dep_name,
            name: emp.userId.name,
            dob: new Date(emp.dob).toDateString(),
            action: <EmployeeButtons Id={emp._id} />,
          }));
          setEmployees(data);
          setFilteredEmployees(data)
        }
      } catch (error) {
        console.error("Error fetching employees:", error);
        if (error.response && !error.response.data.success) {
          alert(error.response.data.error);
        }
      } finally {
        setEmpLoading(false);
      }
    };
    fetchEmployee();
  }, []);

  const handleFilter = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    const filteredData = employees.filter((emp) =>
      emp.name.toLowerCase().includes(searchTerm) || emp.dep_name.toLowerCase().includes(searchTerm)
    );
    setFilteredEmployees(filteredData);
  };


  return (
    <div className="p-7">
      <div className="text-center mb-5">
        <h3 className="text-2xl font-bold">Manage Employees</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by dep name"
          className="px-4 py-2 border border-gray-300 rounded w-full"
          onChange={handleFilter}
        />
        <Link to="/admin-dashboard/add-employee" className="ml-4 px-4 py-2 bg-teal-600 rounded text-white w-full text-center">Add New Employee</Link>
      </div>
      <div>
        {empLoading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <DataTable columns={columns} data={filteredEmployees} pagination />
        )}
      </div>
    </div>
  );
};

export default List;
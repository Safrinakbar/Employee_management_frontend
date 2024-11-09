import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const columns =[
  {
      name : " S No",
      selector: (row) => row.sno,
      width: "130px"
  },
  {
      name : "Name",
      selector: (row) => row.name,
      sortable:true,
      width: "140px"
  },
  
  {
    name : "Department",
    selector: (row) => row.dep_name,
    width: "140px"
 },
 {
  name : "DOB",
  selector: (row) => row.dob,
  sortable:true,
  width: "140px"

},
  {
      name : " Action",
      selector: (row) => row.action ,
      center:true

  }
]


export const fetchDepartments = async () => {
  let departments = [];
  try {
    const response = await axios.get('http://localhost:5000/api/department', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log(response.data);
    if (response.data.success) {
      departments = response.data.departments;
    }
  } catch (error) {
    console.error("Error fetching departments:", error);
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return departments; 
};


//employees for salary forum
export const getEmployees = async (id) => {
  let employees = []; // Initialize as an empty array
  try {
    const response = await axios.get(`http://localhost:5000/api/employee/department/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    console.log(response.data);
    if (response.data.success) {
      employees = response.data.employees;
    } else {
      console.warn("Failed to fetch employees:", response.data.message);
    }
  } catch (error) {
    console.error("Error fetching employees:", error); 
    if (error.response && !error.response.data.success) {
      alert(error.response.data.error);
    }
  }
  return employees; 
};



export const EmployeeButtons =({Id}) =>{
    const navigate = useNavigate()
    return(
        <div className="flex space-x-3">
            <button className="px-3 py-1 bg-blue-600 text-white " onClick={()=>navigate(`/admin-dashboard/employees/${Id}`)}>View</button>
            <button className="px-3 py-1 bg-green-600 text-white" onClick={()=>navigate(`/admin-dashboard/employees/edit/${Id}`)} >Edit</button>
            <button className="px-3 py-1 bg-yellow-600 text-white" 
                onClick={()=>navigate(`/admin-dashboard/employees/salary/${Id}`)}
                 >Salary</button>
            <button className="px-3 py-1 bg-red-600 text-white" onClick={()=> navigate(`/admin-dashboard/employees/leaves/${Id}`)}>Leave</button>
        </div>
    )
}


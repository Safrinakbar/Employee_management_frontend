import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import AdminDashboard from './pages/admindashboard';
import PrivateRoutes from './utils/PrivateRoutes';
import RoleBaseRoutes from './utils/RoleBaseRoutes';
import AdminSummary from './components/Dashboard/Adminsummary';
import Departmentlist from './components/departments/DepartmentList';
import AddDepartment from './components/departments/AddDepartment';
import EditDepartment from './components/departments/EditDepartment';
import Add from './components/employee/Add';
import View from './components/employee/View';
import Edit from './components/employee/Edit';
import List from './components/employee/List';
import AddSalary from './components/salary/Add';
import ViewSalary from './components/salary/View'
import EmployeeDashboard from './pages/employeeDashboard';
import Summary from './EmployeeDashboard/Summary';
import Leavelist from './components/leave/List'
import AddLeave from './components/leave/Add'
import Setting from './EmployeeDashboard/Setting';
import Table from './components/leave/Table';
import Details from './components/leave/Details';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root to /admin-dashboard */}
        <Route path="/" element={<Navigate to="/admin-dashboard" />} />

        {/* Public route: Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected route: Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requireRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          {/* Nested Routes */}
          <Route index element={<AdminSummary />} />
          <Route path="/admin-dashboard/departments" element={<Departmentlist />} />
          <Route path="/admin-dashboard/add-department" element={<AddDepartment />} />
          <Route path="/admin-dashboard/department/:id" element={<EditDepartment />} />
          <Route path="/admin-dashboard/employees" element={<List />} />
          <Route path="/admin-dashboard/add-employee" element={<Add />} />
          <Route path="/admin-dashboard/employees/:id" element={<View />} />
          <Route path="/admin-dashboard/employees/edit/:id" element={<Edit />} />
          <Route path="/admin-dashboard/employees/salary/:id" element={<ViewSalary />} />           
          <Route path="/admin-dashboard/salary/add" element={<AddSalary />} />
          <Route path="/admin-dashboard/leaves" element={<Table />} />
          <Route path="/admin-dashboard/leaves/:id" element={<Details />} />
          <Route path="/admin-dashboard/employees/leaves/:id" element={<Leavelist />} />
          </Route>

          <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requireRole={["employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
                  <Route index element={<Summary />} />
                  <Route path='/employee-dashboard/profile/:id' element={<View/>} />
                  <Route path='/employee-dashboard/leaves/:id' element={<Leavelist/>} />
                  <Route path='/employee-dashboard/add-leave' element={<AddLeave/>} />
                  <Route path='/employee-dashboard/salary/:id' element={<ViewSalary/>} />
                  <Route path='/employee-dashboard/setting' element={<Setting/>} />

        </Route>


      </Routes>
    </BrowserRouter>
  );
}

export default App;

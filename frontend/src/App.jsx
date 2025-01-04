import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import UserLogin from "./pages/UserLogin";
import Registration from "./pages/Register";
import Candidates from "./pages/Candidates";
import Attendance from "./pages/Attendance";
import Employee from "./pages/Employee";
import Leaves from "./pages/Leaves";
import AddNewCandidates from "./components/forms/AddNewCandidates";
import AddNewLeaves from "./components/forms/AddNewLeaves";
import PrivateComponent from "./components/PrivateComponent";
import Logout from "./components/Logout";
import EmployeeForm from "./pages/EmployeeForm";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/register" element={<Registration/>} />
         
          <Route
            path="/dashboard/candidate"
            element={<DashBoard heading="Candidate" tag={<Candidates />} />}
          />
          <Route
            path="/dashboard/attendance"
            element={<DashBoard heading="Attendance" tag={<Attendance />} />}
          />
          <Route
            path="/dashboard/employees"
            element={<DashBoard heading="Employee" tag={<Employee />} />}
          />

           <Route
            path="/employeeUpdate/:id"
            element={<DashBoard heading="Employee" tag={<EmployeeForm />} />}
          />
          <Route
            path="/dashboard/leaves"
            element={<DashBoard heading="leaves" tag={<Leaves />} />}
          />

          <Route
            path="/dashboard/addnewcandidate"
            element={<AddNewCandidates />}
          />

          <Route path="/dashboard/addnewleaves" element={<AddNewLeaves />} />
       
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

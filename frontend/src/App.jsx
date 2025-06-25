import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import UserLogin from "./pages/UserLogin";
import Registration from "./pages/Register";
import Candidates from "./pages/Candidates";
import AddNewCandidates from "./components/forms/AddNewCandidates";

import ProtectedRoute from './middlewares/ProtectedRoute';
import Attendance from "./pages/Attendance";
import { Provider } from 'react-redux';
import store from "./store";
import Employee from "./pages/Employee";
import EditAttendanceModel from './components/forms/EditAttendanceModel';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserLogin />} />
          <Route path="/register" element={<Registration />} />
          <Route
            path="/dashboard/candidate"
            element={
              <ProtectedRoute>
                <DashBoard heading="Candidate" tag={<Candidates />} />

              </ProtectedRoute>
            }
          />
          <Route path="/dashboard/addNewCandidate" element={<AddNewCandidates />} />
          <Route path="/dashboard/employees" element={
            <ProtectedRoute>
              <DashBoard heading="employees" tag={<Employee />} />

            </ProtectedRoute>
          } />

          <Route path="/dashboard/attendance" element={
            <ProtectedRoute>
              <DashBoard heading="attendance" tag={<Attendance/>} />

            </ProtectedRoute>
          } />

          

        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

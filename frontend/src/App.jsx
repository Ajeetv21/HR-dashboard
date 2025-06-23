import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./components/DashBoard";
import UserLogin from "./pages/UserLogin";
import Registration from "./pages/Register";
import Candidates from "./pages/Candidates";
import ProtectedRoute from './middlewares/ProtectedRoute';
import { Provider } from 'react-redux';
import store from "./store";

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
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;

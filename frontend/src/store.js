import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import candidateReducer  from './features/CandidateSlice'
import EmployeeReducer from './features/EmployeeSlice'
import LeaveReducer from "./features/leaveSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        candidates:candidateReducer,
        employees:EmployeeReducer,
        leaves:LeaveReducer
    },
});

export default store;
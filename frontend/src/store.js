import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import candidateReducer  from './features/CandidateSlice'
import EmployeeReducer from './features/EmployeeSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        candidate:candidateReducer,
        employees:EmployeeReducer
    },
});

export default store;
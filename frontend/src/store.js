import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import candidateReducer  from './features/auth/CandidateSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        candidate:candidateReducer
    },
});

export default store;
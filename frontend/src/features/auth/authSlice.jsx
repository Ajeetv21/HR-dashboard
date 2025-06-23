
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';



export const loginUser = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`/login`, { email, password });
            toast.success("Login successful!");

            localStorage.setItem("authToken", response.data.token);
            localStorage.setItem("authUser", JSON.stringify(response.data));

            return response.data; 
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);



export const registerUser = createAsyncThunk('auth/registerUser', async ({ username, email, password }, thunkAPI) => {
    try {
        const response = await axiosInstance.post('/register', { username, email, password });
        toast.success("registration successful!");
        return response.data; 
    } catch (error) {
         toast.error(error.response?.data?.message || "Login failed");
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: localStorage.getItem('authToken') || null,
        loading: false,
        error: null,
        isAuthenticated: !!localStorage.getItem('authToken'),
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser')
        },
    },
    extraReducers: (builder) => {
        builder
            // Login Cases
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                localStorage.setItem('authToken', action.payload.token);
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Register Cases
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.isAuthenticated = true;
                localStorage.setItem('authToken', action.payload.token);
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;



import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import { toast } from 'react-toastify';


const BaseUrl ="http://localhost:4000/api/v1/"


export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BaseUrl}/login`, { email, password });
      toast.success("Login successful!");

      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("authUser", JSON.stringify(response.data.user));

      return response.data; // { token: "...", user: {...} }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return rejectWithValue(error.response?.data?.message);
    }
  }
);


// Register API
export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
    try {
        const response = await BaseUrl.post('/register', userData);
        return response.data; // { user, token }
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: JSON.parse(localStorage.getItem('authUser')) || null,
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
            localStorage.removeItem('authUser');
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
                localStorage.setItem('authUser', JSON.stringify(action.payload.user));
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
                localStorage.setItem('authUser', JSON.stringify(action.payload.user));
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

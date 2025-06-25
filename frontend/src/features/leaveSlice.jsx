import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const token = localStorage.getItem("authToken");

export const fetchLeaves = createAsyncThunk(
    "employee/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/getleave', {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            })
            return res.data

        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch employees");
        }
    }
)


const leaveSlice = createSlice({
    name: 'leaves',
    initialState: {
        leaves: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {


        builder
            .addCase(fetchLeaves.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchLeaves.fulfilled, (state, action) => {
                state.loading = false;
                state.leaves = action.payload;
            })
            .addCase(fetchLeaves.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        


    },
});

export default leaveSlice.reducer;

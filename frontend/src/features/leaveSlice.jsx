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

export const createLeave = createAsyncThunk(
    "leave/create",
    async ({ name, email, phone, position, status, experience, file }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            formData.append('position', position);
            formData.append('status', status);
            formData.append('experience', experience);
            formData.append('file', file);

            const response = await axiosInstance.post(`/createCandidate`, formData, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });
            toast.success("Candidate created successfully!");
            return response.data;
        } catch (error) {
            toast.error(error.response?.data?.message || "Candidate creation failed");
            return rejectWithValue(error.response?.data?.message);
        }
    }
);


export const updateLeaveStatus = createAsyncThunk(
    "leave/update",
    async ({ id, updatedData }, { rejectWithValue }) => {


        try {
            const token = localStorage.getItem('authToken');

            const res = await axiosInstance.put(`/lv/update/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return res.data;

        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update leave");
        }
    }
);





const leaveSlice = createSlice({
    name: 'leaves',
    initialState: {
        leaves: [],
        loading: false,
        error: null,
        createLeave: null
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
        builder
            .addCase(createLeave.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createLeave.fulfilled, (state, action) => {
                state.loading = false;
                state.createLeave = action.payload;
                state.leaves.push(action.payload);
            })
            .addCase(createLeave.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(updateLeaveStatus.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLeaveStatus.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.leaves.findIndex(leave => leave._id === action.payload._id);
                if (index !== -1) {
                    state.leaves[index] = action.payload;
                }
            })
            .addCase(updateLeaveStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });




    },
});

export default leaveSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';

const token = localStorage.getItem("authToken");

export const createCandidate = createAsyncThunk(
    "candidate/create",
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


export const fetchCandidate = createAsyncThunk(
    "candidate/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/Allcandidates', {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            return res.data.data

        } catch (error) {

        }
    }
)
export const deleteCandidate = createAsyncThunk(
    "candidate/delete",
    async (_id, { rejectWithValue }) => {
        
        try {
            const res = await axiosInstance.delete(`/candidates/${_id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            toast.success("candidate deleted successfully")
            return res.data.data

        } catch (error) {

        }
    }
)



const CandidatesSlice = createSlice({
    name: 'candidates',
    initialState: {
        candidates: [],
        loading: false,
        error: null,
        createdCandidate: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createCandidate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.createdCandidate = action.payload;
                state.candidates.push(action.payload);
            })
            .addCase(createCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

       builder 
             .addCase(fetchCandidate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates=(action.payload);
            })
            .addCase(fetchCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

      builder 
             .addCase(deleteCandidate.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCandidate.fulfilled, (state, action) => {
                state.loading = false;
                 state.candidates = state.candidates.filter(item => item._id !== action.payload);
            })
            .addCase(deleteCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });         
    },
});

export default CandidatesSlice.reducer;

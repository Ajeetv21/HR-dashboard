import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
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
                }
            });
            return res.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const deleteCandidate = createAsyncThunk(
    "candidate/delete",
    async (_id, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete(`/candidates/${_id}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                }
            });
            toast.success("Candidate deleted successfully");
            return _id;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message);
        }
    }
);

export const updateCandidate = createAsyncThunk(
    "candidate/update",
    async ({ id, updatedData }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(`/candidate/update/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return res.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update candidate");
        }
    }
);

export const searchByPsCandidate = createAsyncThunk(
    'candidate/search',
    async ({ position, status }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`search/cnd/`, {
                params: { position, status },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Search failed");
        }
    }
);
export const ByNameSearchCandidate = createAsyncThunk(
    'candidate/name',
    async ({ name }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`search/name/cnd`, {
                params: { name },
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || "Search failed");
        }
    }
);

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
            })
            .addCase(createCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates.push(action.payload);
            })
            .addCase(createCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        builder
            .addCase(fetchCandidate.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates = action.payload;
            })
            .addCase(fetchCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        builder
            .addCase(deleteCandidate.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates = state.candidates.filter(c => c._id !== action.payload);
            })
            .addCase(deleteCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        builder
            .addCase(updateCandidate.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateCandidate.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.candidates.findIndex(c => c._id === action.payload._id);
                if (index !== -1) {
                    state.candidates[index] = action.payload;
                }
            })
            .addCase(updateCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
        builder
            .addCase(searchByPsCandidate.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchByPsCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates = action.payload;
            })
            .addCase(searchByPsCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder

            .addCase(ByNameSearchCandidate.pending, (state) => {
                state.loading = true;
            })
            .addCase(ByNameSearchCandidate.fulfilled, (state, action) => {
                state.loading = false;
                state.candidates = action.payload;
            })
            .addCase(ByNameSearchCandidate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default CandidatesSlice.reducer;

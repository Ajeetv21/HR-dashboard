import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const token = localStorage.getItem("authToken");

// export const updateEmployee = createAsyncThunk(
//     "employees/update",
//     async (_id,{ name, email, phone, position, status, experience, file }, { rejectWithValue }) => {
//         try {
//             const formData = new FormData();
//             formData.append('name', name);
//             formData.append('email', email);
//             formData.append('phone', phone);
//             formData.append('position', position);
//             formData.append('status', status);
//             formData.append('experience', experience);
//             formData.append('file', file);

//             const response = await axiosInstance.post(`/employee/${id}`, formData, {
//                 headers: {
//                     authorization: `Bearer ${token}`,
//                     'Content-Type': 'multipart/form-data',
//                 }
//             });
//             toast.success("employee updated successfully!");
//             return response.data;
//         } catch (error) {
//             toast.error(error.response?.data?.message || "employee update failed");
//             return rejectWithValue(error.response?.data?.message);
//         }
//     }
// );


export const fetchEmployees = createAsyncThunk(
    "employee/fetch",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get('/employees', {
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



export const deleteEmployee = createAsyncThunk(
    "employee/delete",
    async (_id, { rejectWithValue }) => {

        try {
            const res = await axiosInstance.delete(`/employee/${_id}`, {
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
export const updateEmployee = createAsyncThunk(
    "employee/update",
    async ({ id, updatedData }, { rejectWithValue }) => {


        try {
            const token = localStorage.getItem('authToken');

            const res = await axiosInstance.put(`/employee/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            return res.data;

        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update employee");
        }
    }
);
export const ByNameSearchEmployee = createAsyncThunk(
    'employee/name',
    async ({ name }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`emp/search`, {
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

export const PositionSearchEmployee = createAsyncThunk(
    'employee/position',
    async ({ position }, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get(`emp/search/position`, {
                params: { position },
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

const EmployeeSlice = createSlice({
    name: 'employees',
    initialState: {
        employees: [],
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {


        builder
            .addCase(fetchEmployees.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployees.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(fetchEmployees.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(deleteEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = state.employees.filter(item => item._id !== action.payload);
            })
            .addCase(deleteEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(updateEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateEmployee.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.employees.findIndex(emp => emp._id === action.payload._id);
                if (index !== -1) {
                    state.employees[index] = action.payload;
                }
            })
            .addCase(updateEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(ByNameSearchEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(ByNameSearchEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(ByNameSearchEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
        builder
            .addCase(PositionSearchEmployee.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(PositionSearchEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employees = action.payload;
            })
            .addCase(PositionSearchEmployee.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

    },
});

export default EmployeeSlice.reducer;

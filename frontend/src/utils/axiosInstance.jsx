import axios from 'axios';

const axiosInstance = axios.create({
    baseURL:'https://hr-dashboard-ashy.vercel.app/api/v1',
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            window.dispatchEvent(new Event('logout'));
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
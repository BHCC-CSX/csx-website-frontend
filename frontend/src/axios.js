import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        //'Authorization': "JWT " + localStorage.getItem('access_token'),
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

axiosInstance.interceptors.request.use((config) => {
    const access_token = localStorage.getItem("access_token")
    //const refresh_token = localStorage.getItem("refresh_token")
    if (access_token) {
        config.headers.Authorization = "JWT " + access_token
    }
    return config
})

export default axiosInstance;
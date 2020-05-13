import axios from "axios";

const axiosAuth = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

axiosAuth.interceptors.request.use((config) => {
    const access_token = localStorage.getItem("access_token")
    //const refresh_token = localStorage.getItem("refresh_token")
    if (access_token) {
        config.headers.Authorization = "JWT " + access_token
    }
    return config
})

const axiosUnauth = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
    }
});

export { axiosAuth, axiosUnauth };
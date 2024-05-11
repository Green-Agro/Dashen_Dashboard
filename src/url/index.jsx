import axios from "axios";

let apiClient = axios.create({
    baseURL: 'http://164.160.187.141:3344/api/v1/'
});

apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = {
            'Access-Control-Allow-Origin': '*',
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        };
    }
    return config;
});

export default apiClient;

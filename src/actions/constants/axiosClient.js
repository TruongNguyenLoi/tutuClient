import axios from 'axios'
import { API_URL } from './constants'
// import queryString from 'query-string'
const axiosClient = axios.create({
    baseURL: `${API_URL}`,
    headers: {
        'content-type': 'application/json'
    },
    // paramsSerializer: params => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('token');
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

axiosClient.interceptors.response.use(response => {
    if(response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    if(error) {
        console.log(error);
    }
    console.log(error);
    // throw err;
})

export default axiosClient;
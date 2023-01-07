import axios from "axios";
import queryString from 'query-string';
import { BASE_AUTH_URL_API_BE } from "../constants/global";

// Setup default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
const axiosClientAuth = axios.create({
    // baseURL: process.env.REACT_APP_BE_API_V1_URL,
    baseURL: BASE_AUTH_URL_API_BE,
    // baseURL: "http://localhost:8080/api/v1",
    headers: {
        'content-type': 'application/json'
    },
    // paramsSerializer: params => queryString.stringify(params)    // use for axios version: 0.24.0
    paramsSerializer: {
        serialize: params => queryString.stringify(params)  // use for axios version: 1.2.1
    }
});

axiosClientAuth.interceptors.request.use(async (config) => {
    // Handle token here ...
    return config;
});

axiosClientAuth.interceptors.response.use((response) => {
    if(response && response.data) {
        return response.data;
    }

    return response;
}, (error) => {
    // Handle errors
    throw error;
});

export default axiosClientAuth;
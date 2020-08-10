import axios from 'axios';
import Qs from 'qs';


axios.interceptors.request.use(config => {
        config.headers['Content-Type'] = 'application/json; charset=UTF-8'
        return config;
    },
    err => {
        return Promise.reject(err);
    });

axios.interceptors.response.use(res => {
        return res.data
    },
    err => {
        return Promise.reject(err);
    });

export default axios;

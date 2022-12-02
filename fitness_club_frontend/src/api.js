import axios from 'axios';

const apiClient = () => axios.create({
    baseURL: 'http://localhost:5002',
    timeout: 1000
})

apiClient.interceptors.request.use((config) => {
    const userDetails = localStorage.getItem('user');
    if(userDetails){ // if user is signed in then add token to request header
        const token = JSON.parse(userDetails).token;
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
}, 
(error) => {
    return Promise.reject(error);
}
)


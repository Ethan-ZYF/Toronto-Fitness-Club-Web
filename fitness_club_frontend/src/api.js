import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 1000
})

apiClient.interceptors.request.use(
    (config) => {
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

// public routes

export const register = async(data) => {
    return await apiClient.post('/accounts/signup/', data, {headers: {
        'Content-Type': "multipart/form-data"
      }});       
}

export const login = async(data) => {
    return await apiClient.post('/accounts/api/token/', data);       
}

// auth routes 

export const logout = async () => {
    return await apiClient.post('/accounts/logout/');       
}

export const editProfile = async (data) => {
    return await apiClient.put('/accounts/edit/', data, {headers: {
        'Content-Type': "multipart/form-data"
      }});
}

export const getPlans = async () => {
    return await apiClient.get('/accounts/plans/');
}

export const getAllStudios = async() => {
    return await apiClient.get('/studios/all/');
}

export const filterStudios = async(data) => {
    return await apiClient.get('/studios/filter-studio/', {params: {name: data.name, amenities: data.amenities, class_name: data.class_name, coach_name: data.coach_name}});
}

export const searchLocationStudios = async(data) => {
    return await apiClient.post('/studios/search-location/', data);
}
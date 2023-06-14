import axios, { Axios } from 'axios'

export const API_URL = 'https://gateway.scan-interfax.ru/'

const api = axios.create({
    Credentials: true,
    baseURL: API_URL,
    responseType: 'json',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

export default api;
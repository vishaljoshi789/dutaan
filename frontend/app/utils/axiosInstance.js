import axios from 'axios'
import {jwtDecode} from "jwt-decode";
import dayjs from 'dayjs'


const baseURL = 'http://127.0.0.1:8000'


let authTokens = typeof window!=="undefined" && localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null

const axiosInstance = axios.create({
    baseURL,
    headers:{Authorization: `Bearer ${authTokens?.access}`}
});

axiosInstance.interceptors.request.use(async req => {
    if(!authTokens){
        authTokens = typeof window!=="undefined" && localStorage.getItem('accessToken') ? JSON.parse(localStorage.getItem('accessToken')) : null
        req.headers.Authorization = `Bearer ${authTokens?.access}`
    }

    const user = jwtDecode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 2;

    if(!isExpired) return req
    try{
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
            refresh: authTokens.refresh
        });

        typeof window!=="undefined" && localStorage.setItem('accessToken', JSON.stringify(response.data))
        req.headers.Authorization = `Bearer ${response.data.access}`
    }catch(error){
        console.log(error)
    }
    return req
})


export default axiosInstance;
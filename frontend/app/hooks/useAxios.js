import { jwtDecode } from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


const baseURL = 'http://127.0.0.1:8000'

const useAxios = () => {
    const { authToken, setUser, setAuthToken } = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL,
        headers:{
            Authorization: `Bearer ${authToken?.access}`
        }
    })
    axiosInstance.interceptors.request.use(async (req)=>{
        req.headers.Authorization = `Bearer ${authToken?.access}`
        const user = jwtDecode(authToken.access);
        const isExpired = dayjs.unix(user.exp).diff(dayjs())<2;
        if(!isExpired) return req;
        // console.log(authToken.refresh)
        const response = await axios.post(`${baseURL}/api/token/refresh/`, { refresh: authToken.refresh })
        // console.log(response)
        localStorage.setItem('accessToken', JSON.stringify(response.data))
        setUser(jwtDecode(response.data.access))
        setAuthToken(response.data)
        req.headers.Authorization = `Bearer ${response.data.access}`
        return req;
    })

    return axiosInstance
}

export default useAxios;
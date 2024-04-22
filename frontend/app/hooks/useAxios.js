import { jwtDecode } from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { redirect } from "next/navigation";



const useAxios = () => {
    const { authToken, setUser, setAuthToken, baseURL } = useContext(AuthContext)

    if(!authToken){
        redirect('/auth/login')
    }

    const axiosInstance = axios.create({
        baseURL,
        headers:{
            Authorization: `Bearer ${authToken?.access}`
        }
    })

    const interceptor = axiosInstance.interceptors.request.use(
        async (req) => {
          
            axios.interceptors.response.eject(interceptor);
            req.headers.Authorization = `Bearer ${authToken?.access}`
                    const user = jwtDecode(authToken.access);
                    const isExpired = dayjs.unix(user.exp).diff(dayjs())<1;
                    if(!isExpired) {return req;}
                    // console.log(authToken.refresh)
                    else{
                        const response = await axios.post(`${baseURL}/api/token/refresh/`, { refresh: authToken.refresh })
                        // console.log(response)
                        localStorage.setItem('accessToken', JSON.stringify(response.data))
                        setUser(jwtDecode(response.data.access))
                        setAuthToken(response.data)
                        req.headers.Authorization = `Bearer ${response.data.access}`
                        return req;
            }
        },
        async (error) => {
          
          return Promise.reject(error);
        });
//     const interceptor = axiosInstance.interceptors.request.use(async (req)=>{
//         req.headers.Authorization = `Bearer ${authToken?.access}`
//         const user = jwtDecode(authToken.access);
//         const isExpired = dayjs.unix(user.exp).diff(dayjs())<1;
//         if(!isExpired) {return req;}
//         // console.log(authToken.refresh)
//         else{
//                 try{
//                 axios.interceptors.response.eject(interceptor);

//                     const response = await axios.post(`${baseURL}/api/token/refresh/`, { refresh: authToken.refresh })
//                     // console.log(response)
//                     localStorage.setItem('accessToken', JSON.stringify(response.data))
//                     setUser(jwtDecode(response.data.access))
//                     setAuthToken(response.data)
//                     req.headers.Authorization = `Bearer ${response.data.access}`
//                     return req;
//                 }catch(e){
//                 axios.interceptors.response.eject(interceptor);

//                     // return axiosInstance(req);
//                 }
            
            
//         }
//     }
//   );

    return axiosInstance
}

export default useAxios;
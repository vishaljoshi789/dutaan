import { jwtDecode } from "jwt-decode";
import axios from "axios";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/navigation";

const useAxios = () => {
  const { authToken, setUser, setAuthToken, baseURL } = useContext(AuthContext);

  let router = useRouter();

  if (!authToken) {
    router.push("/auth/login");
  }

  const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
      Authorization: `Bearer ${authToken?.access}`,
    },
  });

  const interceptor = axiosInstance.interceptors.request.use(async (req) => {
    req.headers.Authorization = `Bearer ${authToken?.access}`;
    const user = jwtDecode(authToken.access);
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
    if (!isExpired) {
      return req;
    } else {
      try {
        const response = await axios.post(`${baseURL}/api/token/refresh/`, {
          refresh: authToken.refresh,
        });
        console.log(response.data);
        localStorage.setItem("accessToken", JSON.stringify(response.data));
        setUser(jwtDecode(response.data.access));
        setAuthToken(response.data);
        req.headers.Authorization = `Bearer ${response.data.access}`;
        return req;
      } catch (error) {
        console.error("Error refreshing token:", error);
        // Handle token refresh failure (e.g., redirect to login page)
        router.push("/auth/login");
      }
    }
  });

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        router.push("/auth/login");
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;

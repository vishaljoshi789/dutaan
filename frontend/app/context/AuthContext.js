"use client";
import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "sonner";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const baseURL = "http://127.0.0.1:8000";

  const router = useRouter();

  let [user, setUser] = useState(null);
  let [authToken, setAuthToken] = useState(null);
  let [loading, setLoading] = useState(true);
  let [userInfo, setUserInfo] = useState(null);
  let [cartCount, setCartCount] = useState();

  useEffect(() => {
    setUserInfo(
      localStorage.getItem("userInfo")
        ? JSON.parse(localStorage.getItem("userInfo"))
        : null
    );
    setAuthToken(
      localStorage.getItem("accessToken")
        ? JSON.parse(localStorage.getItem("accessToken"))
        : null
    );
    setUser(
      localStorage.getItem("accessToken")
        ? jwtDecode(localStorage.getItem("accessToken"))
        : null
    );

    setLoading(false);
  }, []);
  useEffect(() => {
    if (authToken) {
      setUser(jwtDecode(authToken.access));
      getUserDetails();
      cartc();
    }
  }, [authToken, loading]);

  let cartc = async () => {
    try {
      if (user && authToken) {
        let response = await axiosInstance.get(`/getCartCount/`);
        if (response.status == 200) {
          setCartCount(response.data.cartCount);
        }
      }
    } catch (error) {}
  };

  let loginTokenFetch = async (username, password) => {
    let response = await fetch(`${baseURL}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setUserInfo(null);
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("accessToken", JSON.stringify(data));
      toast.success("Login Success!");
      router.push("/account");
    } else {
      toast.error("Authentication Failed");
      userLogout();
    }
  };

  let loginUser = (e) => {
    e.preventDefault();
    loginTokenFetch(e.target.username.value, e.target.password.value);
  };

  let loginAdminUser = async (e) => {
    e.preventDefault();
    let username = e.target.username.value;
    let password = e.target.password.value;
    let response = await fetch(`${baseURL}/api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthToken(data);
      setUser(jwtDecode(data.access));
      localStorage.setItem("accessToken", JSON.stringify(data));
      toast.success("Login Success!");
      router.push("/dutaanSuperAdmin");
    } else {
      userLogout();
    }
  };

  let registerUser = async (e) => {
    e.preventDefault();
    if (e.target.password1.value !== e.target.password2.value) {
      toast.error("Password Does Not Match");
      router.push("/auth/register");
      return;
    }
    const formData = new FormData();

    let userformdata = JSON.stringify({
      name: e.target.name.value,
      email: e.target.email.value,
      username: e.target.email.value,
      password: e.target.password1.value,
      status: "Active",
      phone: e.target.phone.value,
      gender: e.target.gender.value,
      role: e.target.role.value === "Vendor" ? "Vendor" : "Customer",
    });
    formData.append("user", userformdata);

    let addressformdata = JSON.stringify({
      name: e.target.name.value,
      contact: e.target.phone.value,
      street_address: e.target.address.value,
      city: e.target.city.value,
      state: e.target.state.value,
      zip_code: e.target.zipcode.value,
      country: "India",
    });
    formData.append("address", addressformdata);

    if (e.target.role.value === "Vendor") {
      formData.append("store_name", e.target.store_name.value);
      formData.append("store_description", e.target.store_description.value);
      formData.append("aadhar", e.target.aadhar.files[0]);
      formData.append("gst", e.target.gst.value);
      formData.append("user_image", e.target.image.files[0]);
    }
    let response = await fetch(`${baseURL}/register/`, {
      method: "POST",
      body: formData,
    });

    if (response.status === 201) {
      let data = await response.json();
      loginTokenFetch(e.target.email.value, e.target.password.value);
    } else {
      let data = await response.json();
      // console.log(data)
      if (data["user"]["email"]) {
        toast.error("Email already registered");
      }
    }
  };

  let userLogout = () => {
    setAuthToken(null);
    setUser(null);
    setUserInfo(null);
    typeof window !== "undefined" && localStorage.removeItem("accessToken");
    typeof window !== "undefined" && localStorage.removeItem("userInfo");
    router.push("/auth/login");
  };

  let getUserDetails = async () => {
    if (!userInfo) {
      let response = await axiosInstance.get("/userInfo/");
      if (response.status === 200) {
        setUserInfo(response.data);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
      } else {
        userLogout();
      }
    }
  };

  let contextData = {
    user: user,
    registerUser: registerUser,
    userLogout: userLogout,
    loginUser: loginUser,
    authToken: authToken,
    userInfo: userInfo,
    setUserInfo: setUserInfo,
    setUser: setUser,
    setAuthToken,
    setAuthToken,
    baseURL: baseURL,
    loginAdminUser: loginAdminUser,
    cartc: cartc,
    cartCount: cartCount,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

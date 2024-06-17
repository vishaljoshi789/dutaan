"use client";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/navigation";

const PrivateRoute = ({ children, ...rest }) => {
  let router = useRouter();
  let path = usePathname();
  let { user } = useContext(AuthContext);
  return (
    <div {...rest}>
      {!user && path !== "/auth/login" ? router.push("/auth/login") : children}
    </div>
  );
};

export default PrivateRoute;

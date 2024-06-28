"use client";
import React, { useContext } from "react";
import { usePathname } from "next/navigation";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/navigation";

const VendorRoute = ({ children, ...rest }) => {
  let router = useRouter();
  let { user, userInfo } = useContext(AuthContext);
  return (
    <div {...rest}>
      {user && userInfo.user.role === "Vendor" ? children : router.push("/")}
    </div>
  );
};

export default VendorRoute;

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";



const withAuth = (Component) => {
  const AuthenticatedComponent = (props) => {



    
    const router = useRouter();

    const getUserInfo = async () => {
      fetch("https://localhost:7136/api/Auth/getUser", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.username && data.key) {
            console.log("giriş yapıldı")
            console.log(data);
          } else {
            
            router.replace("/auth/login");
          }
        })
        .catch(() => router.replace("/auth/login"));
    };

    useEffect(() => {
      getUserInfo();
    }, []);
   

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;


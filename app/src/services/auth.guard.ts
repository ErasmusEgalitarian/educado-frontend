import React from "react";
import { useNavigate } from "react-router-dom";

export function ProtectedRoute ({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  if (localStorage.getItem("token")) { //For now, this only checks if there's an item "token" in the local storage, but not if it's the correct token
    return children;
  }
  React.useEffect(() => {
    navigate("/")
  }, []);
};


export default ProtectedRoute;
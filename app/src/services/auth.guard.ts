import React from "react";
import { useNavigate } from "react-router-dom";


//This service decides in what cases a route is accessible to the user
export function ProtectedRoute ({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();

  //If the user has a token, they can access protected routes, such as /profile, /courses etc.
  if (localStorage.getItem("token")) { 
    console.log("Token found")
    return children;

  } else {
  console.log("No token found")

  React.useEffect(() => {
    navigate("/")
  }, []);
  return null;
}
};

export function NonProtectedRoute ({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();

  //If the user HAS a token, they cannot access /welcome, /signup, or /login
  if (!localStorage.getItem("token")) { 
    return children;

  } else {
  React.useEffect(() => {
    navigate("/courses")
  }, []);
  return null;
}

}


export default ProtectedRoute;
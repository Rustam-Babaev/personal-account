import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import{IStore}from "../../types/types"
import React from "react";

interface ProtectedRouteProps{
  children?:any
}

const ProtectedRoute:React.FC<ProtectedRouteProps>=({ children })=> {
  const isLoggedIn = useSelector((state:IStore) => state.login.isLoggedIn);
  return isLoggedIn ? children : <Navigate to="/" />;
}

export default ProtectedRoute
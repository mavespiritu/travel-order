import { useEffect, useState } from "react"
import { useNavigate, Navigate, Outlet } from "react-router-dom"
import useStorage from "../../hooks/useStorage"
//import { useIsAuthenticated, useMsal } from "@azure/msal-react";


const ProtectedRoutes = (/* {children} */) => {

  const { token } = JSON.parse(useStorage().get())
  //const navigate = useNavigate()

  // MS365 Auth API Hook
  // const isAuthenticated = useIsAuthenticated()

  /* useEffect(() => {
    if(token === null) navigate('/login')
    console.log("I am logged in") */
    //if(!isAuthenticated) navigate('/login')
  /* }, [token]) */

  //return children

  return(
    token ? <Outlet/> : <Navigate to="/login" />
  )
}

export default ProtectedRoutes
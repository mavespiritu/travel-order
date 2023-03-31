import { useEffect } from "react"
import { useNavigate, useLocation, Navigate, Outlet } from "react-router-dom"
import useStorage from "../../hooks/useStorage"
//import { useMsal, useIsAuthenticated } from "@azure/msal-react";
//import { InteractionStatus } from "@azure/msal-browser";

const PublicRoutes = (/* {children} */) => {

  const { token } = JSON.parse(useStorage().get())
  /* const navigate = useNavigate()
  const redirectPath = location.state?.path || '/' */

    // MS365 Auth API Hook
    //const isAuthenticated = useIsAuthenticated()

  /* useEffect(() => {
    if(token !== null) navigate(redirectPath, {replace: true})
    console.log("I am logged out") */
    //if(isAuthenticated) navigate(redirectPath, {replace: true})
  /* }, [token]) */

  //return children
  return(
    !token ? <Outlet/> : <Navigate to="/" />
  )
}

export default PublicRoutes
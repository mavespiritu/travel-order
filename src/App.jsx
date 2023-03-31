import React, { useEffect, useState } from 'react'
import useToken from './hooks/useToken'
import useStorage from './hooks/useStorage'
import ProtectedRoutes from './utils/ProtectedRoutes'
import PublicRoutes from './utils/PublicRoutes'
import { useNavigate } from "react-router-dom"
//import { InteractionStatus } from "@azure/msal-browser"
//import { callMsGraph } from "./config/graph"
//import { useIsAuthenticated, useMsal } from "@azure/msal-react"
import './css/style.scss';
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import loadable from '@loadable/component'

const Dashboard = loadable(() => import('./modules/Dashboard/index'))

// User Management Routes
const Login = loadable(() => import('./modules/UserManagement/Login/index'))
const Login365 = loadable(() => import('./modules/UserManagement/Login365/index'))
const Register = loadable(() => import('./modules/UserManagement/Register/index'))
const EmailSent = loadable(() => import('./modules/UserManagement/EmailSent/index'))
const VerifyEmail = loadable(() => import('./modules/UserManagement/VerifyEmail/index'))
const ForgotPassword = loadable(() => import('./modules/UserManagement/ForgotPassword/index'))
const ResetPassword = loadable(() => import('./modules/UserManagement/ResetPassword/index'))

// Travel Order Routes
const TravelOrders = loadable(() => import('./modules/TravelOrder'))
const NewTravelOrder = loadable(() => import('./modules/TravelOrder/New'))
const EditTravelOrder = loadable(() => import('./modules/TravelOrder/Edit'))

// Leave Management Routes
const Leaves = loadable(() => import('./modules/LeaveApplication/pages/Leaves'))
const NewLeave = loadable(() => import('./modules/LeaveApplication/pages/Leaves/New'))
const EditLeave = loadable(() => import('./modules/LeaveApplication/pages/Leaves/Edit'))

function App() {
  
  useToken()
  const location = useLocation()
  const navigate = useNavigate()

  // Idle Timer Test
  /* const onIdle = () => {
    useStorage().reset()
    navigate('/login')
  } */

  //const idleTimer = useIdleTimer({onIdle, timeout: 1000 * 60 * 5})

  // MS365 API
  //const { instance, accounts, inProgress } = useMsal()
  //const [graphData, setGraphData] = useState(null);
  //const isAuthenticated = useIsAuthenticated()

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto'
    window.scroll({ top: 0 })
    document.querySelector('html').style.scrollBehavior = ''
  }, [location.pathname]); // triggered on route change

  /* useEffect(() => {
    if(isAuthenticated && inProgress === InteractionStatus.None){
      instance.acquireTokenSilent({
        account: accounts[0],
        scopes: ["User.Read"]
      }).then(response => {
        callMsGraph(response.accessToken).then(response => setGraphData(response));
      })
    }else{
      navigate('/login')
    }

  }, [inProgress, isAuthenticated, accounts, instance]) */

  return (
      <Routes>
        <Route element={ <ProtectedRoutes/> }>
          { /* User Management Routes */ } 
          <Route path="/verify/email" element={ <EmailSent /> } />
          <Route path="/verify-email" element={ <VerifyEmail /> } />
          { /* Travel Order Routes */ } 
          <Route path="/travel-orders" element={ <TravelOrders /> }>
            <Route path="add" element={ <NewTravelOrder /> } />
            <Route path=":id" element={ <EditTravelOrder /> } />
          </Route>
          { /* Landing Page */ } 
          <Route path="/" exact element={ <Dashboard /> } />
          
        </Route>

        <Route element={ <PublicRoutes/> }>
          <Route path="/login365" element={ <Login365 /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/register" element={ <Register /> } />
          <Route path="/password/forgot" element={ <ForgotPassword /> } />
          <Route path="/password/reset/:token" element={ <ResetPassword /> } />
        </Route>
        { /* Leave Application */ } 
        <Route path="/leave-application" element={ <Leaves />}>
          <Route path="new" element={<NewLeave />} />
          <Route path="update/:id" element={<EditLeave />} />
        </Route>
      </Routes>
  );
}

export default App;

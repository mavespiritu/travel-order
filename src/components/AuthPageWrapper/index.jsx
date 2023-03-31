
import { Link } from 'react-router-dom';

import AuthImage from '../../images/auth-image.jpg';
import AuthDecoration from '../../images/auth-decoration.png';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react"

const AuthPageWrapper = ({children}) => {

  return (
    <UnauthenticatedTemplate>
      <div className="bg-white flex justify-center items-center">

        <div className="flex flex-col">

        {children}

        </div>

      </div>
    </UnauthenticatedTemplate>
  )
}

export default AuthPageWrapper
import { useMsal } from "@azure/msal-react"
import { loginRequest } from "../../../config/auth"
import PrimaryButton from '../../../components/Buttons/Primary'

function Login365() {
    const { instance, loading } = useMsal();

    const handleLogin365 = (loginType) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                console.log(e);
            });
        } else if (loginType === "redirect") {
            instance.loginRedirect(loginRequest).catch(e => {
                console.log(e);
            });
        }
    }
  return (
    <>
    <PrimaryButton 
                label={"Login with NEDA Email"}
                submitting={loading}
                handleClick={() => handleLogin365("popup")} 
            />
    </>
  )
}

export default Login365
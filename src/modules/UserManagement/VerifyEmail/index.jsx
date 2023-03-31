import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { verifyEmail } from "./api"
import useStorage from '../../../hooks/useStorage'
import { beUrl } from "../../../constants/url"
import PrimaryButton from "../../../components/Buttons/Primary"
import AuthPageWrapper from '../../../components/AuthPageWrapper'

function VerifyEmail() {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [isResend, setIsResend] = useState(false)
    const [isOk, setIsOk] = useState(false)
    const [isError, setIsError] = useState(false)
    const [isRetrying, setIsRetrying] = useState(false)

    const queryURL = searchParams.get('queryURL')
    const signature = searchParams.get('signature')
    const url = `${beUrl}${queryURL}&signature=${signature}`

    const sendVerifyEmail = (url) => {
        setIsRetrying(true)
        setIsError(false)
        verifyEmail(url).then(res => {
            setIsOk(true)
            setIsError(false)
            setIsResend(false)
            setIsRetrying(false)
            useStorage().set(res?.data?.data)
        }).catch(err => {
            setIsOk(false)
            setIsError(true)
            setIsResend(true)
            setIsRetrying(false)
          if (err?.response?.status===403) {
            
          }
        })
    }

    const handleClick = () => {
        navigate('/')
    }

    useEffect(() => {
        sendVerifyEmail(url)
    },[])

    return (
        <AuthPageWrapper>
            <h2 className="text-2xl text-slate-800 font-bold mb-2">Email verification</h2>
            {isOk && 
                <div>
                    <p>Congratulations! You can now use your account.</p>
                    <PrimaryButton 
                        label="Go to Dashboard"
                        submitting={false}
                        handleClick={handleClick}
                    />
                </div>
            }
            {isResend && 
                <div>
                    <p>Something went wrong while trying to verify your email</p>
                    <PrimaryButton 
                        label="Retry"
                        submitting={isRetrying}
                        handleClick={() => sendVerifyEmail(url)}
                    />
                </div>
            }
        </AuthPageWrapper>
    )
}

export default VerifyEmail
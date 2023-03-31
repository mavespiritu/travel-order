import { useState } from 'react'
import { useMutation } from "@tanstack/react-query"
import { resendLink } from './api'
import useStorage from '../../../hooks/useStorage'
import PrimaryButton from '../../../components/Buttons/Primary'
import AuthPageWrapper from '../../../components/AuthPageWrapper'

function EmailSent() {
    const { id } = JSON.parse(useStorage().get())
    const [isSent, setIsSent] = useState(false)

    const resend = useMutation((data) => resendLink(data), {
        onSuccess: (data, variables, context) => {
            setIsSent(true)
        },
        onError: (err, variables, context) => {
          // if (err?.response?.status===422) {
    
          // }
        },
    })

    const handleClick = () => {
        resend.mutate(id)
    }

    return (
        <AuthPageWrapper>
            { isSent && <p>Email verification link is successfully sent</p> }

            <h2 className="text-2xl text-slate-800 font-bold mb-2">Verify your email address</h2>
            <div className="mb-6">Please check your email for the verfication link. If you have not received the email verification link please click on the button below</div>

            <PrimaryButton
                label="Resend email verification link"
                submitting={resend.isLoading}
                handleClick={handleClick}
            />
        </AuthPageWrapper>
    )
}

export default EmailSent
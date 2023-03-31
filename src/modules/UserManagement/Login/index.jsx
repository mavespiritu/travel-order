import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useState } from "react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { login } from "./api"
import { initialValues, validationSchema } from './validation'
import { useFormik } from 'formik'
import AuthPageWrapper from '../../../components/AuthPageWrapper'
import InputTag from '../../../components/Forms/InputTag'
import SubmitButton from '../../../components/Forms/SubmitButton'
import SuccessButton from '../../../components/Buttons/Success'
import ErrorMessage from '../../../components/Forms/ErrorMessage'
import useStorage from '../../../hooks/useStorage'
import { useMsal } from "@azure/msal-react"
import { loginRequest } from '../../../config/auth'

function Login() {

    const [invalidLogin, setInvalidLogin] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const location = useLocation()
    const navigate = useNavigate()
    const redirectPath = location.state?.path || '/'

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

    const {handleSubmit, handleChange, handleBlur, errors, touched, values }  = useFormik({
      initialValues: initialValues,
      validationSchema: validationSchema,
      onSubmit: (values) => {
          loginUser(values)
      }
    })

    const {mutate: loginUser, isLoading: isloginLoading} = useMutation(login, {
        onSuccess: ({data, status, message}) => {
          useStorage().set(data?.data)
          navigate(redirectPath, {replace: true})
        },
        onError: (err) => {
            setInvalidLogin(true)
            setErrorMessage(err?.response?.data?.message || `Can't connect to the server`)
        }
    })

    return (
      <AuthPageWrapper>
        <h1 className="text-3xl text-slate-800 font-bold">Login Page</h1>
        {/* Form */}
        { invalidLogin && <ErrorMessage message={errorMessage} /> }  
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="space-y-4">
            <InputTag
              label="Email"
              type="text"
              id="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
              handleBlur={handleBlur}
              invalid={errors.email && touched.email}
              error={errors.email}
            />
            <InputTag
              label="Password"
              type="password"
              id="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
              handleBlur={handleBlur}
              invalid={errors.password && touched.password}
              error={errors.password}
            />
          </div>
          <div className="flex flex-col mt-6 gap-2">
            <SubmitButton title={'Log in'} submitting={isloginLoading} />
            <SuccessButton 
                label={"Login with NEDA Email"}
                submitting={loading}
                handleClick={() => handleLogin365("popup")} 
            />
            <Link className="text-sm underline hover:no-underline" to="/password/forgot">Forgot Password?</Link>
          </div>
        </form>
        {/* Footer */}
        <div className="pt-5 mt-6 border-t border-slate-200">
          <div className="text-sm">
            Don’t you have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/register">Register</Link>
          </div>
        </div>
      </AuthPageWrapper>
      )
}

export default Login
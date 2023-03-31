import { useEffect } from 'react';
import { Link, useLocation, useNavigate, Navigate } from 'react-router-dom'
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { register } from "./api"
import { initialValues, validationSchema } from './validation'
import { useFormik } from 'formik'
import AuthPageWrapper from '../../../components/AuthPageWrapper'
import TextInput from '../../../components/Forms/TextInput'
import SubmitButton from '../../../components/Forms/SubmitButton'
import ErrorMessages from '../../../components/Forms/ErrorMessages'
import useStorage from '../../../hooks/useStorage'
import useAuth from '../../../hooks/useAuth'

function Register() {
  const navigate = useNavigate()
  const [invalidRegister, setInvalidRegister] = useState(false)
  const [errorMessages, setErrorMessages] = useState([])

  const {handleSubmit, handleChange, handleBlur, errors, touched, values }  = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
        registerUser(values)
    }
  })

  const {mutate: registerUser, isLoading: isRegisterLoading} = useMutation(register, {
    onSuccess: ({data, status, message}) => {
      console.log(message)
      useStorage().set(data?.data)
      navigate('/verify/email')
    },
    onError: (err) => {
        setInvalidRegister(true)
        setErrorMessages(err?.response?.data?.data)
    }
})

  return (
    <AuthPageWrapper>
      { invalidRegister && <ErrorMessages messages={errorMessages} /> }  
      <h1 className="text-3xl text-slate-800 font-bold mb-6">Registration Page</h1>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="space-y-4">
          <TextInput
            label="Employee ID"
            type="text"
            id="emp_id"
            name="emp_id"
            required={true}
            value={values.emp_id}
            handleChange={handleChange}
            invalid={errors.emp_id && touched.emp_id}
            invalidMessage={errors.emp_id}
          />
          <TextInput
            label="First Name"
            type="text"
            id="first_name"
            name="first_name"
            required={true}
            value={values.first_name}
            handleChange={handleChange}
            invalid={errors.first_name && touched.first_name}
            invalidMessage={errors.first_name}
          />
          <TextInput
            label="Middle Name"
            type="text"
            id="middle_name"
            name="middle_name"
            value={values.middle_name}
            handleChange={handleChange}
            invalid={errors.middle_name && touched.middle_name}
            invalidMessage={errors.middle_name}
          />
          <TextInput
            label="Last Name"
            type="text"
            id="last_name"
            name="last_name"
            required={true}
            value={values.last_name}
            handleChange={handleChange}
            invalid={errors.last_name && touched.last_name}
            invalidMessage={errors.last_name}
          />
          <TextInput
            label="Suffix"
            type="text"
            id="ext_name"
            name="ext_name"
            value={values.ext_name}
            handleChange={handleChange}
            invalid={errors.ext_name && touched.ext_name}
            invalidMessage={errors.ext_name}
          />
          <hr />
          <TextInput
            label="Email"
            type="text"
            id="email"
            name="email"
            required={true}
            value={values.email}
            handleChange={handleChange}
            invalid={errors.email && touched.email}
            invalidMessage={errors.email}
          />
          <TextInput
            label="Password"
            type="password"
            id="password"
            name="password"
            required={true}
            value={values.password}
            handleChange={handleChange}
            invalid={errors.password && touched.password}
            invalidMessage={errors.password}
          />
          <TextInput
            label="Confirm Password"
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            required={true}
            value={values.password_confirmation}
            handleChange={handleChange}
            invalid={errors.password_confirmation && touched.password_confirmation}
            invalidMessage={errors.password_confirmation}
          />
        </div>
        <div className="flex items-center justify-between mt-6">
          <SubmitButton title={'Register'} submitting={isRegisterLoading} />
        </div>
      </form>
      <div className="pt-5 mt-6 border-t border-slate-200">
        <div className="text-sm">
          Have an account? <Link className="font-medium text-indigo-500 hover:text-indigo-600" to="/login">Sign In</Link>
        </div>
      </div>
    </AuthPageWrapper>
  )
}

export default Register

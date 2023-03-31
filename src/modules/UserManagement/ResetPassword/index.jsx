import { useState } from 'react'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './validation'
import { useMutation } from "@tanstack/react-query"
import { useSearchParams, useParams } from 'react-router-dom'
import TextInput from '../../../components/Forms/TextInput'
import SubmitButton from '../../../components/Forms/SubmitButton'

import { passwordReset } from './api'
import AuthPageWrapper from '../../../components/AuthPageWrapper'

function ResetPassword() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [searchParams] = useSearchParams()
  const params = useParams()

  const email = searchParams.get('email')
  const { token } = params
  const [errorMessages, setErrorMessages] = useState([])

  const userModel = useMutation(data => passwordReset(data), {
    onSuccess: (data, variables, context) => {
      setIsSuccess(true)
      setIsError(false)
      resetForm()
    },
    onError: (err, variables, context) => {
      setIsSuccess(false)
      if (err?.response.status===422) {
        setFieldError('password', err?.response?.data?.message)
      } else {
        setIsError(true)
      }
    },
  })

  const onSubmit = (values, {
    // setSubmitting,
    // resetForm
  }) => {
    const payload = {email, token, ...values}
    userModel.mutate(payload)
  }

  const {
    values,
    errors,
    touched,
    handleChange,
    // handleBlur,
    handleSubmit,
    resetForm,
    // setFieldValue,
    // setFieldTouched,
    setFieldError,
    // isSubmitting,
    // isValid,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  return (
    <AuthPageWrapper>
        <h2 className="text-2xl text-slate-800 font-bold mb-2">Password Recovery</h2>
        <div className="mb-6">Reset your password</div>
        {isSuccess && <p>Password successfully reset</p>}
        {isError && <p>Something went wrong while trying to reset your password. Please try again</p>}
        <form onSubmit={handleSubmit} autoComplete="off">
            <div className="space-y-4">
              <div className="mx-auto w-52">
                <div>
                  <TextInput
                    label="Password"
                    type="password"
                    id="password"
                    name="password"
                    value={values?.password}
                    handleChange={handleChange}
                    required={true}
                    invalid={errors?.password && touched?.password}
                    invalidMessage={errors?.password}
                  />
                </div>
                <div className='mt-4'>
                  <TextInput
                    label="Confirm Password"
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    value={values?.password_confirmation}
                    handleChange={handleChange}
                    required={true}
                    invalid={errors?.password_confirmation && touched?.password_confirmation}
                    invalidMessage={errors?.password_confirmation}
                  />
                </div>
              </div>
              <div className='mt-4'>
                <SubmitButton title={"Submit"} submitting={userModel?.isLoading} />
              </div>
            </div>
          </form>
    </AuthPageWrapper>
  )
}

export default ResetPassword
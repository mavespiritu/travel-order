import { useState } from 'react'
import { useFormik } from 'formik'
import { useMutation } from "@tanstack/react-query"
import { passwordLink } from './api' 
import { initialValues, validationSchema } from './validation'
import AuthPageWrapper from '../../../components/AuthPageWrapper'
import TextInput from '../../../components/Forms/TextInput'
import SubmitButton from '../../../components/Forms/SubmitButton'
import ErrorMessage from '../../../components/Forms/ErrorMessage'

function ForgotPassword() {
    const [isSuccess, setIsSuccess] = useState(false)
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const userModel = useMutation(data => passwordLink(data), {
        onSuccess: (data, variables, context) => {
            setIsSuccess(true)
            setIsError(false)
        },
        onError: (err, variables, context) => {
          setIsSuccess(false)
          setErrorMessage(err?.message)
          if (err?.response.status===422) {
            setFieldError('email', err?.response?.data?.message)
          } else {
            setIsError(true)
          }
        },
    })

    const onSubmit = (values, {
        // setSubmitting,
        // resetForm
    }) => {
        userModel.mutate(values)
    }

    const {
        values,
        errors,
        touched,
        handleChange,
        // handleBlur,
        handleSubmit,
        // resetForm,
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
            { isError && <ErrorMessage message={errorMessage} /> }
            <h2 className="text-2xl text-slate-800 font-bold mb-2">Password Recovery</h2>
            <div className="mb-6">Enter the email address linked with your account, and we'll email you a link for you to change your password</div>
            {isSuccess && <p>We've sent you a password recovery link. Please check your email</p>}
            {isError && <p>Something went wrong while trying to send password recovery link. Please try again</p>}
            <form onSubmit={handleSubmit} autoComplete="off">
                <div className="space-y-4">
                    <div className="mx-auto w-52">
                        <TextInput
                        label="Email"
                        type="email"
                        id="email"
                        name="email"
                        value={values?.email}
                        handleChange={handleChange}
                        required={true}
                        invalid={errors?.email && touched?.email}
                        invalidMessage={errors?.email}
                        />
                    </div>
                    <div className='mt-4'>
                        <SubmitButton title={"Email me recovery link"} submitting={userModel?.isLoading} />
                    </div>
                </div>
            </form>
        </AuthPageWrapper>
    )
}

export default ForgotPassword
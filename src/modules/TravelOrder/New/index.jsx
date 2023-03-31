import { useState, memo, useRef } from 'react'
import { useMutation } from "@tanstack/react-query"
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'

import { initialValues, validationSchema } from '../validation'
import { saveRecord } from '../api'

import Form from '../Form'
import ConfirmAction from '@components/Forms/ConfirmAction'
import GrowlSuccess from '@components/Growl/GrowlSuccess'
import GrowlError from '@components/Growl/GrowlError'

const New = () => {

  const navigate = useNavigate()

  const [confirm, setConfirm] = useState(false)
  const trigger = useRef(null)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(false)

  // React Query
  const model = useMutation(data => saveRecord(data), {
    onSuccess: (data, variables, context) => {
      // data?.data?.data
      formik.resetForm()
      formik.setSubmitting(false)
      setSuccess(true)
      navigate(`/travel-orders/view/${data?.data?.data?.id}`, {state: {from: 'new'}})
    },
    onError: (err, variables, context) => {
      formik.setSubmitting(false)
      if (err?.response?.status===422) {
        if (err?.response?.data?.data?.name) {
          formik.setFieldError('record.name', err?.response?.data?.data?.name[0])
        }
      } else {
        setError(true)
      }
    },
  })
  //

  // Formik
  const onSubmit = (values, {
    setSubmitting,
    // resetForm
  }) => {

    const { record } = values
    model.mutate(record)

  }

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  })

  const onOk = () => {
    formik.submitForm()
  }

  const onCancel = () => {
    setConfirm(false)
  }
  //

  return (
    <>
      <Form
        title="Travel Order Form"
        formik={formik}
        setConfirm={setConfirm}
        trigger={trigger}
      />
      <ConfirmAction
        modalOpen={confirm}
        setModalOpen={setConfirm}
        onOk={onOk}
        onCancel={onCancel}
      >
        Are you sure you want to add this record?
      </ConfirmAction>
      <GrowlSuccess
        show={success}
        setShow={setSuccess}
      >
        New record successfuly added
      </GrowlSuccess>
      <GrowlError
        show={error}
        setShow={setError}
      >
        Something went wrong while trying to add new record
      </GrowlError>
    </>
  )
}

export default memo(New)
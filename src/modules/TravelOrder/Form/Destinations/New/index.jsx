import { setNestedObjectValues } from "formik"
import { useState } from "react"
import Form from "../Form"

import GrowlWarning from '@components/Growl/GrowlWarning.jsx'

const New = ({
  i,
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
  setCurrent,
  validateForm,
  setTouched,
}) => {

  const [warning, setWarning] = useState(false)

  const handleOk = (i) => {
    validateForm().then(errors => {
      if (Object.keys(errors).length > 0) {
        setTouched(setNestedObjectValues(errors, true))
      }
    })
    if (!errors?.record?.locations?.[i]) {
      setCurrent('list')
    } else {
      setWarning(true)
    }
  }

  const handleClose = (i) => {
    const valuesCopy = {...values}
    const locationsCopy = valuesCopy.record.locations
    locationsCopy.splice(i,1)
    valuesCopy.record.locations = [...locationsCopy]
    setFieldValue('record.locations', locationsCopy)
    setCurrent('list')
  }

  return (
    <>
      <div className="mt-4">
        <Form
          i={i}
          values={values}
          errors={errors}
          touched={touched}
          handleChange={handleChange}
          setFieldValue={setFieldValue}
          handleOk={() => handleOk(i)}
          handleClose={handleClose}
          edit={false}
        />
      </div>
      <GrowlWarning
        show={warning}
        setShow={setWarning}
      >
        Some field(s) are required
      </GrowlWarning>
    </>
  )
}

export default New
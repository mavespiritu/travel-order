import { setNestedObjectValues } from "formik"
import { useState } from "react"
import Form from "../Form"

import GrowlWarning from '@components/Growl/GrowlWarning'

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
  qVehicles,
  vehicles,
  qDrivers,
  drivers
}) => {

  const [warning, setWarning] = useState(false)

  const handleOk = (i) => {
    validateForm().then(errors => {
      if (Object.keys(errors).length > 0) {
        setTouched(setNestedObjectValues(errors, true))
      }
    })
    if (!errors?.record?.vehicles?.[i]) {
      setCurrent('list')
    } else {
      setWarning(true)
    }
  }

  const handleClose = (i) => {
    const valuesCopy = {...values}
    const vehiclesCopy = valuesCopy.record.vehicles
    vehiclesCopy.splice(i,1)
    valuesCopy.record.vehicles = [...vehiclesCopy]
    setFieldValue('record.vehicles', vehiclesCopy)
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
          qVehicles={qVehicles}
          vehicles={vehicles}
          qDrivers={qDrivers}
          drivers={drivers}
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
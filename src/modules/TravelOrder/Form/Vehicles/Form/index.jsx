import { useEffect, useState } from 'react'

import DropDownSelect from '@components/Forms/DropDownSelect'
import TextAreaTag from '@components/Forms/TextAreaTag'

import MiniSaveButton from '../../MiniSaveButton'
import MiniCancelButton from '../../MiniCancelButton'

import Label from '../../Label'
import Input from '../../Input'

const Form = ({
  i,
  values,
  errors,
  touched,
  handleChange,
  setFieldValue,
  handleOk,
  handleClose,
  edit,
  qVehicles,
  vehicles,
  qDrivers,
  drivers
}) => {
  
  return (
    <>
      <div className="flex justify-start">
        <div className="w-full">
            <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 my-4">
                <Label 
                    title="Vehicle" 
                    description="Select requested vehicle for use in travel"
                    required={true}
                    id="vehicle"
                />
                <Input>
                    <DropDownSelect
                    index="vehicle_description"
                    prop="vehicle_code"
                    label="Vehicle"
                    id="vehicle"
                    name={`record.vehicles[${i}].vehicle`}
                    value={values?.record?.vehicles?.[i]?.vehicle}
                    options={vehicles}
                    setFieldValue={setFieldValue}
                    required={true}
                    invalid={errors?.record?.vehicles?.[i]?.vehicle && touched?.record?.vehicles?.[i]?.vehicle}
                    invalidMessage={errors?.record?.vehicles?.[i]?.vehicle}
                    disabled={qVehicles.isFetching || vehicles.length===0}
                    />
                </Input>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 my-4">
                <Label 
                    title="Driver" 
                    description="Select driver of the requested vehicle"
                    required={true}
                    id="driver"
                />
                <Input>
                    <DropDownSelect
                    index="name"
                    prop="emp_id"
                    label="Driver"
                    id="driver"
                    name={`record.vehicles[${i}].driver`}
                    value={values?.record?.vehicles?.[i]?.driver}
                    options={drivers}
                    setFieldValue={setFieldValue}
                    required={true}
                    invalid={errors?.record?.vehicles?.[i]?.driver && touched?.record?.vehicles?.[i]?.driver}
                    invalidMessage={errors?.record?.vehicles?.[i]?.driver}
                    disabled={qDrivers.isFetching || drivers.length===0}
                    />
                </Input>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 my-4">
                <Label 
                    title="Remarks" 
                    description="Indicate the remarks of the requested vehicle"
                    required={true}
                    id="TO_subject"
                />
                <Input>
                    <TextAreaTag
                        index="remarks"
                        label="Remarks"
                        id="remarks"
                        name={`record.vehicles[${i}].remarks`}
                        value={values?.record?.vehicles?.[i]?.remarks}
                        setFieldValue={setFieldValue}
                        required={true}
                        invalid={errors?.record?.vehicles?.[i]?.remarks && touched?.record?.vehicles?.[i]?.remarks}
                        invalidMessage={errors?.record?.vehicles?.[i]?.remarks}
                        handleChange={handleChange}
                        rows="3"
                    />
                </Input>
            </div>
          <div className="grid grid-cols-4 sm:grid-cols-2 my-4">
            <div></div>
            <div className="flex flex-row-reverse py-2">
              <MiniCancelButton onClick={() => handleClose(i)}>
                {(edit)?'Close':'Cancel'}
              </MiniCancelButton>
              <MiniSaveButton className='mr-2' onClick={() => handleOk(i)}>
                {(edit)?'Save Changes':'Save Destination'}
              </MiniSaveButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Form
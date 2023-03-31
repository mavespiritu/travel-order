import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import csrfToken from '@library/csrfToken'

import DropDownSelect from '@components/Forms/DropDownSelect'
import InputTag from '@components/Forms/InputTag'

import MiniSaveButton from '../../MiniSaveButton'
import MiniCancelButton from '../../MiniCancelButton'

import Label from '../../Label'
import Input from '../../Input'

import {
  getRegions,
  getProvinces,
  getCitymuns,
  getSpecificLocations,
} from '../../../Selections/api'

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
}) => {

  const [regions, setRegions] = useState([])
  const [provinces, setProvinces] = useState([])
  const [citymuns, setCitymuns] = useState([])
  const [specificLocations, setSpecificLocations] = useState([])

  const qRegions = useQuery(['regionList'], () => getRegions(), {
    onSuccess: (res) => {
      setRegions(res?.data?.data)
    }
  })

  const qProvinces =  useQuery(['provinceList', values?.record?.locations?.[i]?.region], () => getProvinces(values?.record?.locations?.[i]?.region), {
    enabled: values?.record?.locations?.[i]?.region !== '',
    onSuccess: (res) => {
      setProvinces(res?.data?.data)
    }
  })

  const qCitymuns =  useQuery(['citymunList', values?.record?.locations?.[i]?.province], () => getCitymuns(values?.record?.locations?.[i]?.province), {
    enabled: values?.record?.locations?.[i]?.province !== '',
    onSuccess: (res) => {
        setCitymuns(res?.data?.data)
    }
  })

  const qSpecificLocations =  useQuery(['specificLocationList', values?.record?.locations?.[i]?.citymun], () => getSpecificLocations(values?.record?.locations?.[i]?.citymun), {
    enabled: values?.record?.locations?.[i]?.citymun !== '',
    onSuccess: (res) => {
        setSpecificLocations(res?.data?.data)
    }
  })

  const regionOptions = regions.map(({id, description}) => ({code: id, name: description}))
  const provinceOptions = provinces.map(({id, description}) => ({code: id, name: description}))
  const citymunOptions = citymuns.map(({id, description}) => ({code: id, name: description}))
  const specificLocationOptions = specificLocations.map(({id, description}) => ({code: id, name: description}))

  const selectStyles = {
    control: (base) => ({
        ...base, 
        boxShadow: "none", 
        outline: 0,
        outlineWidth: 0, 
        borderColor: "inherit",
        fontSize: "0.875rem",
        "&:hover": {
            boxShadow: "none", 
            outline: 0,
            outlineWidth: 0,
            borderColor: "inherit",
            fontSize: "0.875rem",
        },
        "&:focus-within": {
            boxShadow: "none", 
            outline: 0,
            outlineWidth: 0,
            borderColor: "inherit",
            fontSize: "0.875rem",
        }
      })
  };

  return (
    <>
      <div className="flex justify-start">
        <div className="w-full">
          <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 my-4">
            <Label 
              title="Region" 
              description="Select region of the destination"
              required={true}
              id="region"
            />
            <Input>
              <DropDownSelect
                index="name"
                prop="code"
                label="Region"
                id="region"
                name={`record.locations[${i}].region`}
                value={values?.record?.locations?.[i]?.region}
                options={regionOptions}
                setFieldValue={setFieldValue}
                required={true}
                invalid={errors?.record?.locations?.[i]?.region && touched?.record?.locations?.[i]?.region}
                invalidMessage={errors?.record?.locations?.[i]?.region}
                disabled={qRegions.isFetching || regions.length===0}
              />
            </Input>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 my-4">
            <Label 
              title="Province" 
              description="Select province of the destination"
              required={true}
              id="province"
            />
            <Input>
              <DropDownSelect
                index="name"
                prop="code"
                label="Province"
                id="province"
                name={`record.locations[${i}].province`}
                value={values?.record?.locations?.[i]?.province}
                options={provinceOptions}
                setFieldValue={setFieldValue}
                required={true}
                invalid={errors?.record?.locations?.[i]?.province && touched?.record?.locations?.[i]?.province}
                invalidMessage={errors?.record?.locations?.[i]?.province}
                disabled={qProvinces.isFetching || provinces.length===0}
              />
            </Input>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 my-4">
            <Label 
              title="City/Municipality" 
              description="Select city/municipality of the destination"
              required={true}
              id="citymun"
            />
            <Input>
              <DropDownSelect
                index="name"
                prop="code"
                label="City/Municipality"
                id="citymun"
                name={`record.locations[${i}].citymun`}
                value={values?.record?.locations?.[i]?.citymun}
                options={citymunOptions}
                setFieldValue={setFieldValue}
                required={true}
                invalid={errors?.record?.locations?.[i]?.citymun && touched?.record?.locations?.[i]?.citymun}
                invalidMessage={errors?.record?.locations?.[i]?.citymun}
                disabled={qCitymuns.isFetching || citymuns.length===0}
              />
            </Input>
          </div>
          <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 my-4">
            <Label 
              title="Specific Location" 
              description="Select specific location of the destination"
              required={true}
              id="citymun"
            />
            <Input>
              <InputTag
                index="specificLocation"
                label="Specific Location"
                id="specificLocation"
                name={`record.locations[${i}].specificLocation`}
                value={values?.record?.locations?.[i]?.specificLocation}
                setFieldValue={setFieldValue}
                required={true}
                invalid={errors?.record?.locations?.[i]?.specificLocation && touched?.record?.locations?.[i]?.specificLocation}
                invalidMessage={errors?.record?.locations?.[i]?.specificLocation}
                handleChange={handleChange}
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
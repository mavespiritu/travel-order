import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import csrfToken from '@library/csrfToken'
import { 
    getTypes, 
    getVehicles,
    getEmployees 
} from '../Selections/api'
import Label from './Label'
import Input from './Input'
import DropDownSelect from '@components/Forms/DropDownSelect'
import TextAreaTag from '@components/Forms/TextAreaTag'
import InputTag from '@components/Forms/InputTag'
import Tags from '@components/Forms/Tags'
import DateRangeSelect from '@components/Data/Filter/DateRangeSelect'

const TravelOrder = ({
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
}) => {
    const [types, setTypes] = useState([])
    const [vehicles, setVehicles] = useState([])
    const [employees, setEmployees] = useState([])
    const csrf = useQuery(['csrfToken'], csrfToken)

    const qTypes = useQuery(['typeList'], () => getTypes(), {
        onSuccess: (res) => {
        setTypes(res?.data?.data)
        }
    })
    
    const qVehicles = useQuery(['vehicleList'], () => getVehicles(), {
        onSuccess: (res) => {
        setVehicles(res?.data?.data)
        }
    })

    const qEmployees = useQuery(['employeeList'], () => getEmployees(), {
        onSuccess: (res) => {
        setEmployees(res?.data?.data)
        }
    })
    
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
      

    const employeeOptions = employees.map(({emp_id, name}) => ({id: emp_id, name: name}))
    return (
        <>
            <div className="flex justify-start px-4">
                <div className="w-full">
                    <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 my-4">
                        <Label 
                            title="Travel Type" 
                            description="Select the type of travel"
                            required={true}
                            id="travel_type_id"
                        />
                        <Input>
                            <DropDownSelect
                                index="description"
                                prop="id"
                                label="Travel Type"
                                id="type_of_travel"
                                name={`record.type_of_travel`}
                                value={values?.record?.type_of_travel}
                                options={types}
                                setFieldValue={setFieldValue}
                                required={true}
                                invalid={errors?.record?.type_of_travel && touched?.record?.type_of_travel}
                                invalidMessage={errors?.record?.type_of_travel}
                                disabled={qTypes.isFetching || types.length===0}
                            />
                        </Input>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 my-4">
                        <Label 
                            title="Purpose" 
                            description="Indicate the purpose of the travel"
                            required={true}
                            id="TO_subject"
                        />
                        <Input>
                            <TextAreaTag
                                index="TO_subject"
                                label="Purpose"
                                id="TO_subject"
                                name="record.TO_subject"
                                value={values?.record?.TO_subject}
                                setFieldValue={setFieldValue}
                                required={true}
                                invalid={errors?.record?.TO_subject && touched?.record?.TO_subject}
                                invalidMessage={errors?.record?.TO_subject}
                                handleChange={handleChange}
                                rows="3"
                            />
                        </Input>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 my-4">
                        <Label 
                            title="Date of Travel" 
                            description="Indicate the start and end date of travel"
                            required={true}
                            id="date_from"
                        />
                        <Input>
                            <DateRangeSelect
                                index="date_from"
                                label="Date"
                                id="date_from"
                                name="record.date_from"
                                value={values?.record?.date_from}
                                setFieldValue={setFieldValue}
                                required={true}
                                invalid={errors?.record?.date_from && touched?.record?.date_from}
                                invalidMessage={errors?.record?.date_from}
                                handleChange={handleChange}
                                rows="3"
                            />
                        </Input>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 my-4">
                        <Label 
                            title="List of Staff Included" 
                            description="Select all staff (including the requester) included in the travel order"
                            required={false}
                            id="emp_id"
                        />
                        <Input>
                            <Tags
                                label="Staff"
                                title="Staff"
                                id="staffs"
                                name="record.staffs"
                                value={values?.record?.staffs}
                                options={employeeOptions}
                                setFieldValue={setFieldValue}
                                required={false}
                                invalid={errors?.record?.staffs && touched?.record?.staffs}
                                invalidMessage={errors?.record?.staffs}
                                showLabel={false}
                            />
                        </Input>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 my-4">
                        <Label 
                            title="Other Passenger (if any)" 
                            description="List the names of other passenger (outside NEDA) included in the travel order"
                            required={false}
                            id="otherpassenger"
                        />
                        <Input>
                            <InputTag
                                index="otherpassenger"
                                label="Other Staff"
                                id="otherpassenger"
                                name="record.otherpassenger"
                                value={values?.record?.otherpassenger}
                                setFieldValue={setFieldValue}
                                required={false}
                                invalid={errors?.record?.otherpassenger && touched?.record?.otherpassenger}
                                invalidMessage={errors?.record?.otherpassenger}
                                handleChange={handleChange}
                            />
                        </Input>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 my-4">
                        <Label 
                            title="Other Driver (if any)" 
                            description="List the names of other driver (outside NEDA) included in the travel order"
                            required={false}
                            id="otherdriver"
                        />
                        <Input>
                            <InputTag
                                index="otherdriver"
                                label="Other Driver"
                                id="otherdriver"
                                name="record.otherdriver"
                                value={values?.record?.otherdriver}
                                setFieldValue={setFieldValue}
                                required={false}
                                invalid={errors?.record?.otherpassenger && touched?.record?.otherdriver}
                                invalidMessage={errors?.record?.otherdriver}
                                handleChange={handleChange}
                            />
                        </Input>
                    </div>
                    <div className="grid grid-cols-4 sm:grid-cols-2 gap-4 my-4">
                        <Label 
                            title="Other Vehicle (if any)" 
                            description="List the vehicle (outside NEDA) included in the travel order"
                            required={false}
                            id="otherdriver"
                        />
                        <Input>
                            <InputTag
                                index="othervehicle"
                                label="Other Vehicle"
                                id="othervehicle"
                                name="record.othervehicle"
                                value={values?.record?.othervehicle}
                                setFieldValue={setFieldValue}
                                required={false}
                                invalid={errors?.record?.otherpassenger && touched?.record?.othervehicle}
                                invalidMessage={errors?.record?.othervehicle}
                                handleChange={handleChange}
                            />
                        </Input>
                    </div>
                </div>
            </div>
            </>
    )
}

export default TravelOrder
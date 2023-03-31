import { useState, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { setNestedObjectValues } from "formik"
import GrowlWarning from '@components/Growl/GrowlWarning'
import PrimaryButton from '@components/Buttons/Primary'
import SecondaryButton from '@components/Buttons/Secondary'

import TravelOrder from './TravelOrder'
import Destinations from './Destinations'
import Vehicles from './Vehicles'

import Sidebar from './Sidebar'
import Content from './Content'


const Form = ({
    onEdit = false,
    title,
    formik,
    setConfirm,
    trigger
}) => {
    
    const [warning, setWarning] = useState(false)
    const [activeForm, setActiveForm] = useState('travel-order')

    const {
        values,
        errors,
        touched,
        handleChange,
        setFieldValue,
        isSubmitting,
        validateForm,
        setTouched,
    } = formik

    const navigate = useNavigate()

    const handleClose = () => {
        if (location?.state?.from === 'view') {
          navigate(`/travel-orders/view/${values?.record?.TO_NO}`)
        } else {
          navigate("/travel-orders")
        }
    }

    const requiredFields = (errors) => {
        if (Object.keys(errors).length) {
          setWarning(true)
        } else {
          setWarning(false)
        }
    }

    const handleSubmit = () => {
        validateForm().then(errors => {
          if (Object.keys(errors).length > 0) {
            setTouched(setNestedObjectValues(errors, true))
          } else {
            setConfirm(true)
          }
          requiredFields(errors)
        })
    }

    return (
        <>
        <div className="flex flex-col md:flex-row md:-mr-px mt-4">
            <Sidebar
                activeForm={activeForm}
                setActiveForm={setActiveForm}
            />
            <div className="grow">
                {
                    (activeForm === 'travel-order')
                    &&
                    <Content
                        title="Travel Information"
                    >
                    <TravelOrder
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                    />
                    </Content>
                }
                {
                    (activeForm === 'vehicle')
                    &&
                    <Content
                        title="Vehicles"
                    >
                    <Vehicles
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        validateForm={validateForm}
                        setTouched={setTouched}
                    />
                    </Content>
                }
                {
                    (activeForm === 'destination')
                    &&
                    <Content
                        title="Destinations"
                    >
                    <Destinations
                        values={values}
                        errors={errors}
                        touched={touched}
                        handleChange={handleChange}
                        setFieldValue={setFieldValue}
                        validateForm={validateForm}
                        setTouched={setTouched}
                    />
                    </Content>
                }
                <footer>
                    <div className="flex flex-col px-4 py-5">
                        <div className="flex self-end">
                            <SecondaryButton label={`${onEdit ? 'Close' : 'Cancel'}`} handleClick={handleClose} />
                            <PrimaryButton handleClick={handleSubmit} trigger={trigger} label={`${onEdit ? 'Update' : 'Save'}`} submitting={isSubmitting} />
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        </>
    )
}

export default Form
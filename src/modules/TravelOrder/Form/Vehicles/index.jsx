import { useState, useMemo } from 'react'
import MiniAddButton from '../MiniAddButton'
import List from './List'
import New from './New'

import { useQuery } from '@tanstack/react-query'

import csrfToken from '@library/csrfToken'

import {
    getVehicles,
    getEmployees,
  } from '../../Selections/api'


const Vehicles = ({
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    validateForm,
    setTouched,
}) => {

    const [current, setCurrent] = useState('list')
    const [edit, setEdit] = useState(null)
    const [vehicles, setVehicles] = useState([])
    const [drivers, setDrivers] = useState([])

    const csrf = useQuery(['csrfToken'], csrfToken)

    const qVehicles = useQuery(['vehicleList'], () => getVehicles(), {
        enabled: csrf?.isSuccess,
        onSuccess: (res) => {
        setVehicles(res?.data?.data)
        }
    })

    const qDrivers = useQuery(['driverList'], () => getEmployees(), {
        enabled: csrf?.isSuccess,
        onSuccess: (res) => {
        setDrivers(res?.data?.data)
        }
    })

    const rows = useMemo(() => {
        if(!qVehicles || !qDrivers){
            return []
        }

        return [...values?.record?.vehicles].map((vehicle) => {
            const vehicleName = vehicles.find((v) => v.vehicle_code === vehicle.vehicle)?.vehicle_description || vehicle.vehicle;
            const driverName = drivers.find((d) => d.emp_id === vehicle.driver)?.name || vehicle.driver;

            return {
                ...vehicle,
                vehicleName,
                driverName
            }
        })
    }, [[...values?.record?.vehicles], qVehicles, qDrivers])

    //const rows = [...values?.record?.vehicles]

    const handleAdd = () => {
        const data = {
            vehicle: '',
            driver: '',
            remarks: ''
        }

        const valuesCopy = {...values}
        const vehiclesCopy = [...valuesCopy.record?.vehicles]
        vehiclesCopy.push(data)
        setFieldValue(`record.vehicles`, vehiclesCopy)
        setCurrent('new')
    }

    const handleEdit = (i) => {

        setEdit(i)
        setCurrent('edit')

    }

    const handleDelete = (i) => {
    
        const valuesCopy = {...values}
        const vehiclesCopy = valuesCopy.record?.vehicles
        valuesCopy.record.delete_vehicles.push(vehiclesCopy[i].id)
        vehiclesCopy.splice(i, 1)
        valuesCopy.record.vehicles = [...vehiclesCopy]
        setFieldValue('record.vehicles', vehiclesCopy)
    }

    return (
        <>
            <div className="px-4 pb-8">
                <div className="flex flex-row-reverse py-2">
                    <MiniAddButton onClick={handleAdd}>Add Vehicle</MiniAddButton>
                </div>
                {
                current === 'list'
                &&
                <List
                    values={values}
                    errors={errors}
                    setFieldValue={setFieldValue}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                    rows={rows}
                />
                }
                {
                current === 'new'
                &&
                <New
                    i={values?.record?.vehicles?.length - 1 ?? 0}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    setCurrent={setCurrent}
                    validateForm={validateForm}
                    setTouched={setTouched}
                    qVehicles={qVehicles}
                    vehicles={vehicles}
                    qDrivers={qDrivers}
                    drivers={drivers}
                />
                }
                {
                current === 'edit'
                &&
                <Edit
                    i={edit}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    setCurrent={setCurrent}
                    validateForm={validateForm}
                    setTouched={setTouched}
                    qVehicles={qVehicles}
                    vehicles={vehicles}
                    qDrivers={qDrivers}
                    drivers={drivers}
                />
                }
            </div>
        </>
    )
}

export default Vehicles
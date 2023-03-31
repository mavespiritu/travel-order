import { useState } from 'react'
import MiniAddButton from '../MiniAddButton'
import List from './List'
import New from './New'


const Destinations = ({
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

    const handleAdd = () => {
        const data = {
            id: '',
            region: '',
            province: '',
            citymun: '',
            specificLocation: ''
        }

        const valuesCopy = {...values}
        const locations = [...valuesCopy.record?.locations]
        locations.push(data)
        setFieldValue(`record.locations`, locations)
        setCurrent('new')
    }

    const handleEdit = (i) => {

        setEdit(i)
        setCurrent('edit')

    }

    const handleDelete = (i) => {
    
        const valuesCopy = {...values}
        const locations = valuesCopy.record?.locations
        valuesCopy.record.delete_locations.push(locations[i].id)
        locations.splice(i, 1)
        valuesCopy.record.locations = [...locations]
        setFieldValue('record.locations', locations)

    }

    return (
        <>
            <div className="px-4 pb-8">
                <div className="flex flex-row-reverse py-2">
                    <MiniAddButton onClick={handleAdd}>Add Destination</MiniAddButton>
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
                />
                }
                {
                current === 'new'
                &&
                <New
                    i={values?.record?.locations?.length - 1 ?? 0}
                    values={values}
                    errors={errors}
                    touched={touched}
                    handleChange={handleChange}
                    setFieldValue={setFieldValue}
                    setCurrent={setCurrent}
                    validateForm={validateForm}
                    setTouched={setTouched}
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
                />
                }
            </div>
        </>
    )
}

export default Destinations
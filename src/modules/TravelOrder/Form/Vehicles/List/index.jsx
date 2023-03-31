import { useEffect } from 'react'
import TableList from '../../TableList'

const List = ({
  values,
  errors,
  setFieldValue,
  handleEdit,
  handleDelete,
  rows
}) => {

  const headers = [
    {key: 'vehicleName', label: 'Vehicle'},
    {key: 'driverName', label: 'Driver'},
    {key: 'remarks', label: 'Remarks'},
  ]

  useEffect(() => {
    if (errors?.record?.vehicles) {
      const vehiclesCopy = [...values?.record?.vehicles]
      errors?.record?.vehicles.forEach((m,i) => {
        if (m && Object.keys(m).length > 0) {
          vehiclesCopy.splice(i,1)
        }
      })
      setFieldValue('record.vehicles', vehiclesCopy)
    }
  },[])

  return (
    <div className="mt-4">
      <TableList
        id={[]}
        title="vehicles"
        idName={null}
        headers={headers}
        rows={rows}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        useIndex={true}
      />
    </div>
  )
}

export default List
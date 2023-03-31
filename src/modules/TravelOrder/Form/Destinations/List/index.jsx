import { useEffect } from 'react'
import TableList from '../../TableList'

const List = ({
  values,
  errors,
  setFieldValue,
  handleEdit,
  handleDelete
}) => {

  const headers = [
    {key: 'region', label: 'Region'},
    {key: 'province', label: 'Province'},
    {key: 'municipality', label: 'City/Municipality'},
    {key: 'specificLocation', label: 'Specific Location'},
  ]

  const rows = [...values?.record?.locations]

  useEffect(() => {
    if (errors?.record?.locations) {
      const locations = [...values?.record?.locations]
      errors?.record?.locations.forEach((m,i) => {
        if (m && Object.keys(m).length > 0) {
            locations.splice(i,1)
        }
      })
      setFieldValue('record.locations', locations)
    }
  },[])

  return (
    <div className="mt-4">
      <TableList
        id={[]}
        title="destinations"
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
import Td from "./Td"

const Tr = ({
  headers,
  row,
  id,
  idName,
  actions,
}) => {

  return (
    <tr>
      {
        headers.map((h,i) => {
          let name = row[h.key]
          if (id.includes(h.key)) {
            name = idName(row[id])
          }
          if (typeof name === 'boolean') {
            name = (name===true)?'Yes':'No'
          }
          return (
            <Td key={i}>{name}</Td>
          )
        })
      }
      <Td>
        <div className="flex">
          {actions}
        </div>
      </Td>
    </tr>
  )
}

export default Tr
const Th = ({children}) => {

    return (
      <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
        <div className="font-semibold text-left">{children}</div>
      </th>
    )
  }
  
  export default Th
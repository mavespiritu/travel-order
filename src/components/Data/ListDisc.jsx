const ListDisc = ({
  data
}) => {

  return (
    <ul className="list-disc">
      {
        data?.map((d,i) => <li key={i}>{d}</li>)
      }
    </ul>
  )

}

export default ListDisc
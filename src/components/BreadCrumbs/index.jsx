import List from './List'

const Breadcrumbs = ({
  items
}) => {

  return (
    <div className="px-6 py-2 mb-10">
      <div className="">
        {/* Start */}
        <ul className="inline-flex flex-wrap text-sm font-medium">
          {
            items?.map((item,i) => {

              return (
                <List i={i} items={items} key={i} name={item.name} to={item.to} />
              )
            })
          }
        </ul>
        {/* End */}
      </div>
    </div>
  )
}

export default Breadcrumbs


const AllCheckBoxes = ({
  id,
  name,
  prop,
  items,
  tags,
  setTags,
}) => {

  const handleAll = (e) => {
    const tagsCopy = {...tags}
    if (e.target.checked) {
      const i = items.findIndex(i => prop === i.filter)
      if (i>=0) {
        tagsCopy[prop] = []
        items[i].data.forEach(d => {
          tagsCopy[prop].push(d.id)
        })
      }
    } else {
      tagsCopy[prop] = []
    }
    setTags(tagsCopy)
  }

  let checked = tags[prop].length === 0
  const i = items.findIndex(i => prop === i.filter)

  if (i>=0) {
    const data = items[i].data
    checked = data.length === tags[prop].length
  }

  return (
    <li className="py-1 px-3">
      <label className="flex items-center">
        <input
          id={id}
          type="checkbox"
          className="form-checkbox"
          onChange={handleAll}
          checked={checked}
        />
        <span className="text-sm font-medium ml-2">{name}</span>
      </label>
    </li>
  )
}

export default AllCheckBoxes
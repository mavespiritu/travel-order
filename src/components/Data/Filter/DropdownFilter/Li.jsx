const Li = ({
  id,
  name,
  prop,
  tags,
  setTags,
}) => {

  const handleCheckbox = (e) => {
    const tagsCopy = {...tags}
    if (e.target.checked) {
      if (!tagsCopy[prop].includes(e.target.id)) {
        tagsCopy[prop].push(e.target.id)
      }
    } else {
      const i = tagsCopy[prop].findIndex(id => id===e.target.id)
      if (i>=0) {
        tagsCopy[prop].splice(i,1)
      }
    }
    setTags(tagsCopy)
  }

  const checked = tags[prop].includes(id)

  return (
    <li className="py-1 px-3">
      <label className="flex items-center">
        <input
          id={id}
          type="checkbox"
          className="form-checkbox"
          onChange={handleCheckbox}
          checked={checked}
        />
        <span className="text-sm font-medium ml-2">{name}</span>
      </label>
    </li>
  )
}

export default Li
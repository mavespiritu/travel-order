const Radio = ({
  label,
  id,
  name,
  onSelected,
  checked,
  disabled,
}) => {

  return (
    <div className="m-3">
      <label className="flex items-center">
        <input value={id} type="radio" name={name} className="form-radio" disabled={disabled} onChange={onSelected} checked={checked} />
        <span className="text-sm ml-2">{label}</span>
      </label>
    </div>
  )
}

const Radios = ({
  className = '',
  index = "name",
  prop = "id",
  label,
  id,
  name,
  options,
  value,
  setFieldValue,
  required = false,
  invalid,
  invalidMessage,
  disabled,
  showLabel = false
}) => {

  const handleSelected = (e) => {
    setFieldValue(name,e.target.value)
  }

  return (
    <div className={className}>
      <div>
        { showLabel &&
        <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor={id}>
          {label}
          { required && <span className="text-rose-500"> *</span> }
        </label>
        }
        <div className="flex flex-wrap items-center -m-3 mb-1">
          {
            options.map((opt,i) => {

              const checked = opt[prop] === value

              return (
                <Radio
                  key={i}
                  name={name}
                  id={opt[prop]}
                  label={opt[index]}
                  onSelected={handleSelected}
                  checked={checked}
                  disabled={disabled}
                />
              )
            })
          }
        </div>
      </div>
      <div>
      {
        invalid && <div className="text-xs mt-1 text-rose-500">{invalidMessage}</div>
      }
      </div>
    </div>
  )

}

export default Radios
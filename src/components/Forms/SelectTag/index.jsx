const SelectTag = ({
  className,
  index = "name",
  label,
  id,
  name,
  value,
  options,
  handleChange,
  required = false,
  invalid,
  invalidMessage,
  disabled,
  showLabel = false
}) => {

  const selectOptions = options?.map(opt =>
    <option value={opt.id} key={opt.id}>{opt[index]}</option>
  )

  return (
    <div className={className}>
      <div>
        { showLabel &&
        <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor={id}>
          {label}
          { required && <span className="text-rose-500"> *</span> }
        </label>
        }
        <select
          className={`form-select w-full${invalid ? ' border-rose-300' : ''}`}
          id={id}
          name={name}
          value={value || ''}
          onChange={handleChange}
          disabled={disabled}
        >
          <option value="">Select One</option>
          {selectOptions}
        </select>
      </div>
      <div>
      {
        invalid && <div className="text-xs mt-1 text-rose-500">{invalidMessage}</div>
      }
      </div>
    </div>
  )
}

export default SelectTag
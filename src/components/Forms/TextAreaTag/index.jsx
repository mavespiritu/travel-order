const TextAreaTag = ({
  className = '',
  label,
  rows,
  id,
  name,
  value,
  handleChange,
  required = false,
  invalid,
  invalidMessage,
  placeholder = '',
  disabled = false,
  showLabel = false
}) => {

  return (
    <div className={className}>
      <div>
        { showLabel &&
        <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor={id}>
          {label}
          { required && <span className="text-rose-500"> *</span> }
        </label>
        }
        <textarea
          id={id}
          name={name}
          className={
            `form-textarea w-full${invalid ? ' border-rose-300' : ''}`
          }
          rows={rows}
          onChange={handleChange}
          value={value}
          disabled={disabled}
        />
      </div>
      <div>
      {
        invalid && <div className="text-xs mt-1 text-rose-500">{invalidMessage}</div>
      }
      </div>
    </div>
  )
}

export default TextAreaTag
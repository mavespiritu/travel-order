const TextInput = ({
  className = '',
  label,
  type,
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
        <input
          id={id}
          name={name}
          className={`appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 sm:text-sm${invalid ? ' border-rose-300' : 'border-gray-300'}`
          }
          type={type}
          value={value || ''}
          onChange={handleChange}
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

export default TextInput
const InputTag = ({
    label,
    type,
    id,
    name,
    value,
    required,
    handleChange,
    invalid,
    error,
    showLabel = false
  }) => {
  
    return (
      <div>
        <div>
          { showLabel &&
          <label className={`block text-sm font-medium mb-1`}>
            {label}
            { required && <span className="text-rose-500"> *</span> }
          </label>
          }
          <input id={id} name={name} className={`appearance-none relative block w-full px-3 py-2 border placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:z-10 text-sm ${invalid ? ' border-rose-300' : 'border-gray-300'}`
          } type={type} onChange={handleChange} value={value} />
        </div>
        <div>
        {
          invalid && <div className="text-xs mt-1 text-rose-500">{error}</div>
        }
        </div>
      </div>
    )
  }
  
  export default InputTag

  
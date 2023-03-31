const BlockTextInput = ({
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
}) => {

  

  return (
    <div className="mb-1">
      <div>
        <label className="block text-sm font-medium" htmlFor={id}>
          {label}
          { required && <span className="text-rose-500"> *</span> }
        </label>
        <input
          id={id}
          name={name}
          className={
            `form-input w-full px-2 py-1${invalid ? ' border-rose-300' : ''}`
          }
          type={type}
          value={value}
          onChange={handleChange}
        />
      </div>
      <div>
        {
          invalid && <div className="text-xs text-rose-500 mt-1">{invalidMessage}</div>
        }
      </div>
    </div>
  )
}

export default BlockTextInput
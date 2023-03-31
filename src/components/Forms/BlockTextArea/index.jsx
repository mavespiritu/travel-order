const BlockTextArea = ({
  label,
  rows,
  id,
  name,
  value,
  handleChange,
  required = false,
  invalid,
  invalidMessage,
}) => {

  return (
    <div className="mb-1">
      <div>
        <label className="block text-sm font-medium" htmlFor="feedback">
          {label}
          { required && <span className="text-rose-500"> *</span>}
        </label>
        <textarea
          id={id}
          name={name}
          className="form-textarea w-full px-2 py-1"
          rows={rows}
          onChange={handleChange}
        >
          {value}
        </textarea>
      </div>
      <div>
        {
          invalid && <div className="text-xs text-rose-500 mt-1">{invalidMessage}</div>
        }
      </div>
    </div>
  )
}

export default BlockTextArea
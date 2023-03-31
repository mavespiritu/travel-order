import { useState } from "react"

const SwitchOnly = ({
  className,
  label,
  id,
  name,
  on,
  off,
  value,
  setFieldValue,
  required = false,
  invalid,
  invalidMessage,
}) => {

  const handleChange = (e) => {

    setFieldValue(name,!value)

  }

  return (
    <div className={className}>
      <div>
        <div className="flex items-center">
          <div className="form-switch">
            <input type="checkbox" id={id} className="sr-only" value={value} checked={value} onChange={handleChange} />
            <label className="bg-slate-400" htmlFor={id}>
              <span className="bg-white shadow-sm" aria-hidden="true"></span>
              <span className="sr-only">Switch label</span>
            </label>
          </div>
          <div className="text-sm text-slate-400 italic ml-2">{value ? on : off}</div>
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

export default SwitchOnly
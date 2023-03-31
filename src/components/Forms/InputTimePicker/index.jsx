import { useEffect, useState } from "react";
import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/themes/airbnb.css";
import moment from "moment"
import './index.css'

const InputTimePicker = ({
  className,
  label,
  id,
  name,
  value,
  handleChange,
  required = false,
  invalid = false,
  invalidMessage = null,
  disabled = false
}) => {

  const [time, setTime] = useState(null)

  useEffect(() => {
    if (value === "") {
      setTime(null)
    } else {
      setTime(value)
    }
  },[value,setTime])
  
  const handleClear = () => {
    if (disabled) return
    setTime(null)
    handleChange({
      target: {
        name,
        value: ''
      }
    })
  }

  return (
    <div className={className}>
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor={id}>
          {label}
          { required && <span className="text-rose-500"> *</span> }
        </label>
        <div className="relative hover-trigger">
          <Flatpickr
            className={
              `form-input pl-9 text-slate-500 hover:text-slate-600 font-medium focus:border-slate-300 w-full${invalid ? ' border-rose-300' : ''}`
            }
            placeholder="Set time"
            id={id}
            name={name}
            value={time}
            onChange={(time) => {
              setTime(time)
              handleChange({
                target: {
                  name,
                  value: moment(time[0]).format("hh:mm A")
                }
              })
            }}
            options={
              {
                enableTime: true,
                noCalendar: true,
                dateFormat: "G:i K",
              }
            }
            disabled={disabled}
          />
          {
            (time!==null && time !=="")
            &&
            <span
              onClick={handleClear}
              className="absolute top-1 right-1 inline-block cursor-pointer hover-target z-50 text-slate-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </span>
          }
          <div className="absolute inset-0 right-auto flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-current text-slate-100 ml-3" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <circle cx="12" cy="12" r="9" />
              <polyline points="12 7 12 12 15 15" />
            </svg>
          </div>
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

export default InputTimePicker
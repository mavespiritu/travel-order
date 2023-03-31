import { useEffect, useState } from "react";
import Flatpickr from 'react-flatpickr';
import "flatpickr/dist/themes/airbnb.css";
import moment from "moment"
import './index.css'

const InputDatePicker = ({
  className,
  label,
  id,
  name,
  value,
  handleChange,
  required = false,
  invalid = false,
  invalidMessage = null,
  disabled = false,
  showLabel = false
}) => {

  const [date, setDate] = useState(null)

  useEffect(() => {
    if (value === "") {
      setDate(null)
    } else {
      const d = value.split("-")
      setDate(new Date(parseInt(d[0]), parseInt(d[1])-1, parseInt(d[2]) ))
    }
  },[value,setDate])
  
  const handleClear = () => {
    if (disabled) return
    setDate(null)
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
        { showLabel &&
        <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor={id}>
          {label}
          { required && <span className="text-rose-500"> *</span> }
        </label>
        }
        <div className="relative hover-trigger">
          <Flatpickr
            className={
              `form-input pl-9 text-slate-500 hover:text-slate-600 font-medium focus:border-slate-300 w-full${invalid ? ' border-rose-300' : ''}`
            }
            placeholder="Select date"
            id={id}
            name={name}
            value={date}
            onChange={(date) => {
              setDate(date)
              handleChange({
                target: {
                  name,
                  value: moment(date[0]).format("YYYY-MM-DD")
                }
              })
            }}
            options={
              {
                enableTime: false,
                dateFormat: 'M j, Y - D'
              }
            }
            disabled={disabled}
          />
          {
            (date!==null && date !=="")
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
            <svg className="w-4 h-4 fill-current text-slate-500 ml-3" viewBox="0 0 16 16">
              <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
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

export default InputDatePicker
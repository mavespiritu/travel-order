import { useState, useRef, useEffect } from 'react';
import Transition from '@components/Transition';
import './index.css'

const DropDownSelect = ({
  className,
  index = "name",
  prop = "id",
  label,
  id,
  name,
  value,
  options,
  setFieldValue,
  required = false,
  invalid,
  invalidMessage,
  disabled = false,
  showLabel = false
}) => {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selected = options.findIndex(o => o[prop] === value)
  const [suggest, setSuggest] = useState('')

  const trigger = useRef(null);
  const dropdown = useRef(null);
  const searchInput = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (!dropdownOpen || dropdown.current.contains(target) || trigger.current.contains(target)) return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleClick = (e) => {
    e.preventDefault()
    if (disabled) return
    setDropdownOpen(!dropdownOpen)
  }

  const handleSelect = (e,id) => {
    e.preventDefault()
    setFieldValue(name,id)
    setDropdownOpen(false)
    setSuggest('')
  }

  const handleSuggest = (e) => {
    setSuggest(e.target.value)
  }

  const filterOptions = options?.filter(opt =>
    opt[index].toLowerCase().includes(suggest.toLowerCase())
  )

  const handleEnter = (e) => {
    if (e.key==="Enter") {
      if (filterOptions[0]) {
        handleSelect(e,filterOptions[0][prop])
        setSuggest('')
      }
      e.preventDefault()
    }
  }

  const handleClear = () => {
    if (!disabled) setFieldValue(name,'')
  }

  useEffect(() => {
    if (dropdownOpen) {
      searchInput.current.focus()
    }
  },[searchInput,dropdownOpen])

  return (
    <div
      className={className}
    >
      <div className="relative w-full">
        <div>
          { showLabel &&
          <label className="block text-sm font-medium text-gray-600 mb-1" htmlFor={id}>
            {label}
            { required && <span className="text-rose-500"> *</span> }
          </label>
          }
          <div>
            <button
              ref={trigger}
              className={
                `hover-trigger relative btn w-full justify-between min-w-44 bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600${invalid ? ' border-rose-300' : ''}`
              }
              aria-label="Select"
              aria-haspopup="true"
              onClick={handleClick}
              aria-expanded={dropdownOpen}
            >
              <span className="flex items-center">
                <span>
                  {
                    (selected >= 0)
                    ?
                    options[selected][index]
                    :
                    // `Select ${label}`
                    `Select`
                  }
                </span>
              </span>
              {
                (value!==null && value !=="")
                &&
                <span
                  onClick={handleClear}
                  className="absolute top-1 right-6 inline-block cursor-pointer hover-target z-50 text-slate-400"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
              }
              <svg className="shrink-0 ml-1 fill-current text-slate-400" width="11" height="7" viewBox="0 0 11 7">
                <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
              </svg>
            </button>
            <Transition
              show={dropdownOpen}
              tag="div"
              className={
                `absolute top-13 left-0 z-10 w-full bg-white border border-slate-200 py-1.5 rounded shadow-lg mt-1`
              }
              enter="transition ease-out duration-100 transform"
              enterStart="opacity-0 -translate-y-2"
              enterEnd="opacity-100 translate-y-0"
              leave="transition ease-out duration-100"
              leaveStart="opacity-100"
              leaveEnd="opacity-0"
            >
              <div
                ref={dropdown}
                className="font-medium text-sm text-slate-600 divide-y divide-slate-200"
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
              >
                <div className="p-2">
                  <input
                    ref={searchInput}
                    type="text"
                    className="w-full fix h-8 px-2 focus:outline-none border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    value={suggest}
                    onChange={handleSuggest}
                    onKeyDown={handleEnter}
                  />
                </div>
                <div className="overflow-y-auto max-h-72">
                {
                  filterOptions.map((option,i) => {
                    return (
                      <button
                        key={option[prop]}
                        tabIndex="0"
                        className={`flex items-center justify-between w-full hover:bg-slate-50 py-2 px-3 cursor-pointer ${i === selected && 'text-indigo-500'}`}
                        onClick={(e) => handleSelect(e,option[prop])}
                        >
                        <span>{option[index]}</span>
                        <svg className={`shrink-0 mr-2 fill-current text-indigo-500 ${i !== selected && 'invisible'}`} width="12" height="9" viewBox="0 0 12 9">
                          <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                        </svg>
                      </button>
                    )
                  })
                }
                </div>
              </div>
            </Transition>
          </div>
        </div>
        <div>
          {
            invalid && <div className="text-xs mt-1 text-rose-500">{invalidMessage}</div>
          }
        </div>
      </div>
    </div>
  )
}

export default DropDownSelect
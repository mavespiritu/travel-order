import React, { useState, useRef, useEffect } from 'react';
import moment from "moment"
import Transition from '../../../../utils/Transition';

function DateSelect({
  selected,
  setSelected,
  filters,
  setFilters,
  disabled,
}) {

  const options = [
    {
      id: 0,
      period: 'Today'
    },
    {
      id: 1,
      period: 'Last 7 Days'
    },
    {
      id: 2,
      period: 'Last Month'
    },
    {
      id: 3,
      period: 'Last 12 Months'
    },
    {
      id: 4,
      period: 'All Time'
    }
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef(null);
  const dropdown = useRef(null);

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

  const handleClick = () => {
    if (!disabled) setDropdownOpen(!dropdownOpen)
  }

  const fillDays = (id) => {

    /**
     * Today
     * moment().format('YYYY-MM-DD')
     * 
     * Last week
     * moment().subtract(1, 'weeks').startOf('week').format('YYYY-MM-DD')
     * moment().subtract(1, 'weeks').endOf('week').format('YYYY-MM-DD')
     * 
     * Last 7 days
     * moment().subtract(7, 'days').startOf('day').format('YYYY-MM-DD')
     * moment().subtract(1, 'days').startOf('day').format('YYYY-MM-DD')
     * 
     * Last month
     * moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD')
     * moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
     * 
     * Last 12 months
     * moment().subtract(12, 'month').startOf('month').format('YYYY-MM-DD')
     * moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
     * 
     */

    let days = []

    switch (id) {

      case 0: // Today
        days = [
          moment().format('YYYY-MM-DD')
        ]
      break;

      case 1: // Last 7 days
        days = [
          moment().subtract(7, 'days').startOf('day').format('YYYY-MM-DD'),
          moment().subtract(1, 'days').startOf('day').format('YYYY-MM-DD')
        ]
      break;

      case 2: // Last month
        days = [
          moment().subtract(1, 'month').startOf('month').format('YYYY-MM-DD'),
          moment().subtract(1, 'month').endOf('month').format('YYYY-MM-DD')
        ]
      break;

      case 3: // Last 12 months
        days = [
          moment().subtract(12, 'month').startOf('month').format('YYYY-MM-DD'),
          moment().subtract(0, 'month').endOf('month').format('YYYY-MM-DD')
        ]
      break;

      case 4: // All time
        days = []
      break;

      default:
        days = []
      break;

    }

    return days
  }

  const handleSelected = (option) => {

    const filtersCopy = {...filters}
    filtersCopy.dates = fillDays(option.id)
    setFilters(filtersCopy)
    setSelected(option.id);
    setDropdownOpen(false);

  }

  useEffect(() => {
    const filtersCopy = {...filters}
    filtersCopy.dates = fillDays(selected)
    setFilters(filtersCopy)
  },[])

  return (
    <div className="relative">
      <button
        ref={trigger}
        className="btn justify-between min-w-44 bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
        aria-label="Select date range"
        aria-haspopup="true"
        onClick={handleClick}
        aria-expanded={dropdownOpen}
      >
        <span className="flex items-center">
          <svg className="w-4 h-4 fill-current text-slate-500 shrink-0 mr-2" viewBox="0 0 16 16">
            <path d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
          </svg>
          <span>{options[selected].period}</span>
        </span>
        <svg className="shrink-0 ml-1 fill-current text-slate-400" width="11" height="7" viewBox="0 0 11 7">
          <path d="M5.4 6.8L0 1.4 1.4 0l4 4 4-4 1.4 1.4z" />
        </svg>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className="z-10 absolute top-full right-0 w-full bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        enter="transition ease-out duration-100 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          className="font-medium text-sm text-slate-600"
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
        >
          {
            options.map(option => {
              return (
                <button
                  key={option.id}
                  tabIndex="0"
                  className={`flex items-center w-full hover:bg-slate-50 py-1 px-3 cursor-pointer ${option.id === selected && 'text-indigo-500'}`}
                  onClick={() => handleSelected(option)}
                >
                  <svg className={`shrink-0 mr-2 fill-current text-indigo-500 ${option.id !== selected && 'invisible'}`} width="12" height="9" viewBox="0 0 12 9">
                    <path d="M10.28.28L3.989 6.575 1.695 4.28A1 1 0 00.28 5.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28.28z" />
                  </svg>
                  <span>{option.period}</span>
                </button>
              )
            })
          }
        </div>
      </Transition>
    </div>
  );
}

export default DateSelect;

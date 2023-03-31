import React, { useState, useRef, useEffect, Fragment } from 'react';
import Transition from '../../../Transition';
import Li from './Li'
import AllCheckBoxes from './AllCheckboxes';

function DropdownFilter({
  items,
  filters,
  setFilters,
  results,
  align,
  disabled,
}) {

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [tags, setTags] = useState({...filters.tags});

  const handleClear = () => {
    const tagsCopy = {...tags}
    const keys = Object.keys(tagsCopy)
    keys.forEach(k => {
      tagsCopy[k] = []
    });
    setTags(tagsCopy)

    // const filtersCopy = {...filters}
    // const keys = Object.keys(filtersCopy.tags)
    // keys.forEach(k => {
    //   filtersCopy.tags[k] = []
    // });
    // setFilters(filtersCopy)
  }

  const handleApply = () => {

    const filtersCopy = {...filters}
    filtersCopy.tags = tags
    setFilters(filtersCopy)

    results.refetch()
    setDropdownOpen(false)
  }

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

  return (
    <div className="relative inline-flex">
      <button
        ref={trigger}
        className="btn bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
        aria-haspopup="true"
        onClick={handleClick}
        aria-expanded={dropdownOpen}
      >
        <span className="sr-only">Filter</span><wbr />
        <svg className="w-4 h-4 fill-current" viewBox="0 0 16 16">
          <path d="M9 15H7a1 1 0 010-2h2a1 1 0 010 2zM11 11H5a1 1 0 010-2h6a1 1 0 010 2zM13 7H3a1 1 0 010-2h10a1 1 0 010 2zM15 3H1a1 1 0 010-2h14a1 1 0 010 2z" />
        </svg>
      </button>
      <Transition
        show={dropdownOpen}
        tag="div"
        className={`overflow-y-scroll origin-top-right z-10 absolute top-full min-w-56 max-h-80 bg-white border border-slate-200 pt-1.5 rounded shadow-lg overflow-hidden mt-1 ${align === 'right' ? 'right-0' : 'left-0'}`}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div ref={dropdown}>

          {
            items.map((item,i) => {

              return (
                <Fragment key={i}>
                  <div className="text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4">{item.title}</div>
                  <ul className="mb-4">
                    <Fragment key={item.allElem}>
                      <AllCheckBoxes
                        id={`${item.key}`}
                        name="All"
                        prop={item.filter}
                        items={items}
                        tags={tags}
                        setTags={setTags}
                      />
                    </Fragment>
                    {
                      item.data.map(d => {

                        return (
                          <Fragment key={d[item.key]}>
                            <Li
                              id={d[item.key]}
                              name={d[item.name]}
                              prop={item.filter}
                              tags={tags}
                              setTags={setTags}
                            />
                          </Fragment>
                        )
                      })
                    }
                  </ul>
                </Fragment>
              )
            })
          }

          <div className="py-2 px-3 border-t border-slate-200 bg-slate-50">
            <ul className="flex items-center justify-between">
              <li>
                <button
                  className="btn-xs bg-white border-slate-200 hover:border-slate-300 text-slate-500 hover:text-slate-600"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </li>
              <li>
                <button className="btn-xs bg-indigo-500 hover:bg-indigo-600 text-white" onClick={handleApply} onBlur={() => setDropdownOpen(false)}>Apply</button>
              </li>
            </ul>
          </div>

        </div>
      </Transition>
    </div>
  );
}

export default DropdownFilter;
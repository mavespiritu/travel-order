import React from 'react'
import SidebarLinkGroup from '../SidebarLinkGroup';

const LinkGroup = ({
  path,
  name,
  icon,
  pathname,
  sidebarExpanded,
  setSidebarExpanded,
  children
}) => {

  return (
    <SidebarLinkGroup activecondition={pathname === path || pathname.includes(path)}>
      {(handleClick, open) => {
        return (
          <React.Fragment>
            <a
              href="#!"
              className={`block text-slate-200 hover:text-white truncate transition duration-150 ${
                (pathname.includes(path)) && 'hover:text-slate-200'
              }`}
              onClick={(e) => {
                e.preventDefault();
                sidebarExpanded ? handleClick() : setSidebarExpanded(true);
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                    {icon}
                    <span className="text-sm font-medium ml-3 lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
                      {name}
                    </span>
                </div>
                <div className="flex shrink-0 ml-2">
                  <svg
                    className={`w-3 h-3 shrink-0 ml-1 fill-current text-slate-400 ${open && 'transform rotate-180'}`}
                    viewBox="0 0 12 12"
                  >
                    <path d="M5.9 11.4L.5 6l1.4-1.4 4 4 4-4L11.3 6z" />
                  </svg>
                </div>
              </div>
            </a>
            <div className="lg:hidden lg:sidebar-expanded:block 2xl:block">
              <ul className={`pl-9 mt-1 ${!open && 'hidden'}`}>
                {children}
              </ul>
            </div>
          </React.Fragment>
        )
      }}
    </SidebarLinkGroup>
  )
}

export default LinkGroup
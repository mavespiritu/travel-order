import { useLocation } from 'react-router-dom';
import LinkItem from './LinkItem';
import LinkGroup from './LinkGroup';
import LinkGroupItem from './LinkGroupItem';

const Links = ({
  sidebarExpanded,
  setSidebarExpanded
}) => {

  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="space-y-8">
      {/* Pages group */}
      <div>
        <h3 className="text-xs uppercase text-slate-500 font-semibold pl-3">
          <span className="hidden lg:block lg:sidebar-expanded:hidden 2xl:hidden text-center w-6" aria-hidden="true">
            •••
          </span>
          <span className="lg:hidden lg:sidebar-expanded:block 2xl:block">MAIN NAVIGATION</span>
        </h3>
        <ul className="mt-3">
          {/* Dashboard */}
          <LinkItem to="/dashboard" name="Dashboard">
            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
              <path
                className={`fill-current text-slate-400 ${
                  (pathname === '/' || pathname.includes('dashboard')) && '!text-indigo-500'
                }`}
                d="M12 0C5.383 0 0 5.383 0 12s5.383 12 12 12 12-5.383 12-12S18.617 0 12 0z"
              />
              <path
                className={`fill-current text-slate-600 ${(pathname === '/' || pathname.includes('dashboard')) && 'text-indigo-600'}`}
                d="M12 3c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9z"
              />
              <path
                className={`fill-current text-slate-400 ${(pathname === '/' || pathname.includes('dashboard')) && 'text-indigo-200'}`}
                d="M12 15c-1.654 0-3-1.346-3-3 0-.462.113-.894.3-1.285L6 6l4.714 3.301A2.973 2.973 0 0112 9c1.654 0 3 1.346 3 3s-1.346 3-3 3z"
              />
            </svg>
          </LinkItem>
          {/* Travel Order */}
          <LinkGroup
            path="/travel-orders"
            name="Travel Orders"
            icon={
                <svg xmlns="http://www.w3.org/2000/svg" className={`shrink-0 h-6 w-6 ${pathname.includes('travel-orders') ? 'fill-slate-600' : 'fill-slate-400'}`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="7" cy="17" r="2" />
                <circle cx="17" cy="17" r="2" />
                <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
                <path d="M6 10h4m-2 -2v4" />
              </svg>
            }
            pathname={pathname}
            sidebarExpanded={sidebarExpanded}
            setSidebarExpanded={setSidebarExpanded}
          >
            <LinkGroupItem to='/travel-orders/add' name='Add New' />
            <LinkGroupItem to='/travel-orders' name='List' />
            <LinkGroupItem to='/travel-orders/approval' name='Approval' />
          </LinkGroup>
          {/* Incidents */}
          <LinkItem to="/modules" name="Applications">
            <svg xmlns="http://www.w3.org/2000/svg" className={`shrink-0 h-6 w-6 ${pathname.includes('modules') ? 'fill-slate-600' : 'fill-slate-400'}`} width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#9e9e9e" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
              <circle cx="7" cy="17" r="2" />
              <circle cx="17" cy="17" r="2" />
              <path d="M5 17h-2v-11a1 1 0 0 1 1 -1h9v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
              <path d="M6 10h4m-2 -2v4" />
            </svg>
          </LinkItem>
          {/* Users */}
          <LinkItem to="/users" name="Users">
            <svg className="shrink-0 h-6 w-6" viewBox="0 0 24 24">
              <path
                className={`fill-current text-slate-600 ${pathname.includes('users') && 'text-indigo-500'}`}
                d="M18.974 8H22a2 2 0 012 2v6h-2v5a1 1 0 01-1 1h-2a1 1 0 01-1-1v-5h-2v-6a2 2 0 012-2h.974zM20 7a2 2 0 11-.001-3.999A2 2 0 0120 7zM2.974 8H6a2 2 0 012 2v6H6v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5H0v-6a2 2 0 012-2h.974zM4 7a2 2 0 11-.001-3.999A2 2 0 014 7z"
              />
              <path
                className={`fill-current text-slate-400 ${pathname.includes('users') && 'text-indigo-300'}`}
                d="M12 6a3 3 0 110-6 3 3 0 010 6zm2 18h-4a1 1 0 01-1-1v-6H6v-6a3 3 0 013-3h6a3 3 0 013 3v6h-3v6a1 1 0 01-1 1z"
              />
            </svg>
          </LinkItem>
        </ul>
      </div>
    </div>
  )
}

export default Links
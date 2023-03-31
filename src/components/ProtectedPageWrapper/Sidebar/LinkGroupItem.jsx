import { NavLink } from 'react-router-dom';

const LinkGroupItem = ({
  to,
  name,
}) => {

  return (
    <li className="mb-2 last:mb-0">
      <NavLink
        end
        to={to}
        className={({ isActive }) =>
          'block text-slate-400 hover:text-slate-200 transition duration-150 truncate ' + (isActive ? '!text-indigo-500' : '')
        }
      >
        <span className="text-sm font-medium lg:opacity-0 lg:sidebar-expanded:opacity-100 2xl:opacity-100 duration-200">
          {name}
        </span>
      </NavLink>
    </li>
  )
}

export default LinkGroupItem
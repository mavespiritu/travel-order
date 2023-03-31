import { Link } from "react-router-dom"

const List = ({
  i,
  items,
  name,
  to,
}) => {

  return (
    <li className="flex items-center">
      <Link
        className="text-slate-500 hover:text-indigo-500"
        to={to}
      >
        {name}
      </Link>
      {
        i < (items?.length - 1)
        &&
        <svg className="h-4 w-4 fill-current text-slate-400 mx-3" viewBox="0 0 16 16">
          <path d="M6.6 13.4L5.2 12l4-4-4-4 1.4-1.4L12 8z" />
        </svg>
      }
    </li>
  )
}

export default List
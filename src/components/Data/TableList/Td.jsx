import Ellipsis from 'react-ellipsis-component';

import { Link } from "react-router-dom"

const Td = ({
  id = null,
  idLink = null,
  children,
  readMore = null,
}) => {

  return (
    <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
      {
        (id===null)
        ?
        <>
          {
            (readMore?.value)
            ?
            <div className={readMore?.width}>
              <Ellipsis 
                text={children}
                maxLine={readMore?.length}
              />
            </div>
            :
            children
          }
        </>
        :
        <>
          <Link
            className="font-medium text-sky-500"
            to={`${idLink}/${id}`}
          >
            {children}
          </Link>
        </>
      }
    </td>
  )
}

export default Td
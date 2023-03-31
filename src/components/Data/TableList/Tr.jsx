import { useState, useRef } from "react"
import { useNavigate } from "react-router-dom"

import ConfirmAction from "../../Forms/ConfirmAction"
import Td from "./Td"

const checkForEllipsis = (ellipsis,key) => {

  const index = ellipsis.findIndex(e => e.key === key)

  const response = {
    value: false,
    length: 0,
    width: '',
  }

  response.value = index >=0
  response.length = (index >= 0) ? ellipsis[index].length : 0
  response.width = (index >= 0) ? ellipsis[index].width : ''

  return response

}

const Tr = ({
  headers,
  row,
  idName = null,
  idLink = null,
  viewLink = null,
  editLink,
  deleteAction,
  confirDeleteMessage,
  handleClick,
  isChecked,
  ellipsis = [],
}) => {

  const navigate = useNavigate()
  const [confirm, setConfirm] = useState(false)
  const trigger = useRef(null)

  const viewAction = (id) => {
    navigate(`${viewLink}/${id}`)
  }

  const editAction = (id) => {
    navigate(`${editLink}/${id}`)
  }

  const handleDeleteAction = () => {
    setConfirm(true)
  }

  return (
    <tr className="hover:bg-gray-100">
      {
        deleteAction !== null
        &&
        <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
          <div className="flex items-center">
            <label className="inline-flex">
              <span className="sr-only">Select</span>
              <input id={row.id} className="form-checkbox" type="checkbox" onChange={handleClick} checked={isChecked} />
            </label>
          </div>
        </td>
      }
      {
        headers.map((h,i) => {
          
          const readMore = checkForEllipsis(ellipsis,h.key)

          return (
            <Td 
              key={i}
              id={(h.key === idName && idLink !== null) ? row.id : null}
              idLink={idLink}
              readMore={readMore}
            >
              {row[h.key]}
            </Td>
          )
        })
      }
      <td className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
        <div className="space-x-1">
          {
            viewLink
            &&
            <button className="text-slate-400 hover:text-slate-500 rounded-full" onClick={() => viewAction(row.id)}>
              <span className="sr-only">View</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 32 32" stroke="currentColor">
                <path d="m18,16a3,3 0 1 1 -6,0a3,3 0 0 1 6,0z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
                <path d="m6.458,16c1.274,-4.057 5.065,-7 9.542,-7c4.478,0 8.268,2.943 9.542,7c-1.274,4.057 -5.064,7 -9.542,7c-4.477,0 -8.268,-2.943 -9.542,-7z" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
              </svg>
            </button>
          }
          {
            editLink
            &&
            (
              <button className="text-slate-400 hover:text-slate-500 rounded-full" onClick={() => editAction(row.id)}>
                <span className="sr-only">Edit</span>
                <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                  <path d="M19.7 8.3c-.4-.4-1-.4-1.4 0l-10 10c-.2.2-.3.4-.3.7v4c0 .6.4 1 1 1h4c.3 0 .5-.1.7-.3l10-10c.4-.4.4-1 0-1.4l-4-4zM12.6 22H10v-2.6l6-6 2.6 2.6-6 6zm7.4-7.4L17.4 12l1.6-1.6 2.6 2.6-1.6 1.6z" />
                </svg>
              </button>
            )
          }
          {
            deleteAction
            &&
            (
              <>
                <button ref={trigger} className="text-rose-500 hover:text-rose-600 rounded-full" onClick={handleDeleteAction}>
                  <span className="sr-only">Delete</span>
                  <svg className="w-8 h-8 fill-current" viewBox="0 0 32 32">
                    <path d="M13 15h2v6h-2zM17 15h2v6h-2z" />
                    <path d="M20 9c0-.6-.4-1-1-1h-6c-.6 0-1 .4-1 1v2H8v2h1v10c0 .6.4 1 1 1h12c.6 0 1-.4 1-1V13h1v-2h-4V9zm-6 1h4v1h-4v-1zm7 3v9H11v-9h10z" />
                  </svg>
                </button>
                <ConfirmAction
                  id={row.id}
                  trigger={trigger}
                  modalOpen={confirm}
                  setModalOpen={setConfirm}
                  onOk={() => deleteAction(row.id)}
                  onCancel={() => {

                  }}
                >
                  {confirDeleteMessage}
                </ConfirmAction>
              </>
            )
          }
        </div>
      </td>
    </tr>
  )
}

export default Tr
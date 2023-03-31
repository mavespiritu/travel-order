import MiniEditButton from "./MiniEditButton"
import MiniDeleteButton from "./MiniDeleteButton"
import Tr from './Tr'
import Th from './Th'

const TableList = ({
  id,
  idName,
  headers,
  rows,
  handleEdit,
  handleDelete,
  title,
  useIndex = false
}) => {

  return (
    <div className="bg-white rounded-sm border border-slate-200 relative">
      <div>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
              <tr>
                {
                  headers.map((h,i) => <Th key={i}>{h.label}</Th>)
                }
                <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                  <div className="font-semibold text-left">Actions</div>
                </th>
              </tr>
            </thead>
            <tbody className="text-sm divide-y divide-slate-200">
              {
                rows.length > 0 ?
                rows?.map((r,i) => 
                <Tr
                  key={i}
                  headers={headers}
                  row={r}
                  id={id}
                  idName={idName}
                  actions={
                    <>
                    <MiniEditButton
                      className="mr-2"
                      onClick={() => handleEdit((useIndex)?i:r[id])}
                    />
                    <MiniDeleteButton
                      onClick={() => handleDelete((useIndex)?i:r[id])}
                    />
                    </>
                  }
                />) :
                <tr>
                  <td className="text-center py-4" colSpan="5">No {title} found.</td>
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TableList
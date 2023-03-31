import React, { useState, useEffect } from 'react';
import Tr from "./Tr"
import Th from './Th';
import PaginationClassic from './PaginationClassic'
import LoadingOverlay from '../../LoadingOverlay';

function TableList({
  title,
  selectedItems,
  headers,
  rows,
  pagination,
  currentPage,
  setCurrentPage,
  idName = null,
  idLink = null,
  viewLink = null,
  editLink = null,
  deleteAction = null,
  confirDeleteMessage,
  loading = false,
  ellipsis = [],
}) {

  const [selectAll, setSelectAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(rows);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rows]);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setIsCheck(list.map(li => li.id));
    if (selectAll) {
      setIsCheck([]);
    }
  };

  const handleClick = e => {
    const { id, checked } = e.target;
    if (!checked) {
      setSelectAll(false);
      setIsCheck(isCheck.filter(item => item !== id));
    } else {
      const isCheckCopy = [...isCheck, id]
      setIsCheck(isCheckCopy);
      setSelectAll(list.length === isCheckCopy.length)
    }
  };

  useEffect(() => {
    selectedItems(isCheck);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCheck]);

  useEffect(() => {
    if (list.length === 0) {
      setSelectAll(false)
    }
  }, [list])

  return (
    <>
      <div className="bg-white shadow-lg rounded-sm border border-slate-200 relative">
        <header className="px-5 py-4">
          <h2 className="font-semibold text-slate-800">{title} <span className="text-slate-400 font-medium">
            {pagination?.total}
            </span></h2>
        </header>
        <div className={`${loading ? 'relative' : ''}`}>
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-slate-500 bg-slate-50 border-t border-b border-slate-200">
                <tr>
                  {
                    deleteAction !== null
                    &&
                    <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap w-px">
                      <div className="flex items-center">
                        <label className="inline-flex">
                          <span className="sr-only">Select all</span>
                          <input className="form-checkbox" type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                        </label>
                      </div>
                    </th>
                  }
                  {
                    headers.map((h,i) => <Th className='' key={i}>{h.label}</Th>)
                  }
                  <th className="px-2 first:pl-5 last:pr-5 py-3 whitespace-nowrap">
                    <div className="font-bold text-left">Actions</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-200">
                {
                  rows?.map((r,i) => {

                    return (
                      <Tr
                        key={i}
                        headers={headers}
                        row={r}
                        idName={idName}
                        idLink={idLink}
                        viewLink={viewLink}
                        editLink={editLink}
                        deleteAction={deleteAction}
                        confirDeleteMessage={confirDeleteMessage}
                        handleClick={handleClick}
                        isChecked={isCheck.includes(r.id)}
                        ellipsis={ellipsis}
                      />
                    )
                  })
                }
              </tbody>
            </table>
          </div>
          <LoadingOverlay loading={loading} />
        </div>
      </div>
      {
        pagination
        &&
        <PaginationClassic
          pagination={pagination}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      }
    </>
  )
}

export default TableList
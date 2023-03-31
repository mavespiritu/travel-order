import { useState } from 'react'
import { useMutation } from "@tanstack/react-query"
import TableList from '@components/Data/TableList'
import GrowlSuccess from '@components/Growl/GrowlSuccess'
import GrowlError from '@components/Growl/GrowlError'
import MoreActions from "@components/MoreActions"
import DeleteButton from "@components/Data/Filter/DeleteButton"
import { deleteRecord, deleteRecords } from "../api"

function List({
  records,
  pagination,
  currentPage,
  setCurrentPage,
  results,
}) {

  const [deleteSuccess, setDeleteSuccess] = useState(false)
  const [deleteBatchSuccess, setDeleteBatchSuccess] = useState(false)
  const [deleteError, setDeleteError] = useState(false)
  const [deleteBatchError, setDeleteBatchError] = useState(false)

  const deleteOne = useMutation(data => deleteRecord(data), {
    onSuccess: (data, variables, context) => {
      // data?.data?.data
      results.refetch()
      setDeleteSuccess(true)
    },
    onError: (err, variables, context) => {
      setDeleteError(true)
      // if (err?.response?.status===422) {

      // }
    },
  })

  const deleteMany = useMutation(data => deleteRecords(data), {
    onSuccess: (data, variables, context) => {
      // data?.data?.data
      results.refetch()
      setDeleteBatchSuccess(true)
      setSelectedItems([])
    },
    onError: (err, variables, context) => {
      setDeleteBatchError(true)
      // if (err?.response?.status===422) {

      // }
    },
  })
  
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectedItems = (selectedItems) => {
    setSelectedItems([...selectedItems]);
  }
  
  const headers = [
    {key: 'TO_NO', label: 'Travel Order No.'},
    {key: 'TO_subject', label: 'Purpose'},
    {key: 'date_from', label: 'Start Date of Travel'},
    {key: 'date_to', label: 'End Date of Travel'},
    {key: 'type_of_travel', label: 'Type of Travel'},
    {key: 'TO_creator', label: 'Created By'},
    {key: 'date_filed', label: 'Created At'},
    {key: 'isDirector_Approved', label: 'Status'},
  ];

  const deleteAction = (id) => {
    deleteOne.mutate({id})
  }

  const deleteMultitple = () => {
    deleteMany.mutate(selectedItems)
  }

  const onCancel = () => {

  }

  const ellipsis = [
    {
      key: 'TO_NO',
      length: "1",
      width: 'w-28',
    },
    {
      key: 'TO_subject',
      length: "1",
      width: 'w-40',
    }
  ]

  return (
    <>
      <MoreActions
        left={
          <></>
        }
        right={
          <>
            <DeleteButton
              message="Are you sure you want to delete the selected record?"
              selectedItems={selectedItems}
              onOk={deleteMultitple}
              onCancel={onCancel}
            />
          </>
        }
      />
      <TableList
        title="List of Travel Orders"
        selectedItems={handleSelectedItems}
        headers={headers}
        rows={records}
        pagination={pagination}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        idName="TO_NO"
        idLink={"/travel-orders/view"}
        viewLink={"/travel-orders/view"}
        editLink={"/travel-orders"}
        deleteAction={deleteAction}
        confirDeleteMessage="Are you sure you want to delete this record?"
        loading={results.isFetching}
        ellipsis={ellipsis}
      />
      <GrowlSuccess
        show={deleteSuccess}
        setShow={setDeleteSuccess}
      >
        Record has been successfully deleted
      </GrowlSuccess>
      <GrowlSuccess
        show={deleteBatchSuccess}
        setShow={setDeleteBatchSuccess}
      >
        Selected records have been successfully deleted
      </GrowlSuccess>
      <GrowlError
        show={deleteError}
        setShow={setDeleteError}
      >
        Something went wrong while trying to delete record
      </GrowlError>
      <GrowlError
        show={deleteBatchError}
        setShow={setDeleteBatchError}
      >
        Something went wrong while trying to delete selected records
      </GrowlError>
    </>
  )
}

export default List
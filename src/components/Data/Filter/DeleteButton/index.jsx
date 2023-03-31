import React, { useState, useRef } from 'react';

import ConfirmAction from '../../../Forms/ConfirmAction';

function DeleteButton({
  message,
  selectedItems,
  onOk,
  onCancel,
}) {

  const [confirm, setConfirm] = useState(false)
  const trigger = useRef()

  const handleClick = () => {
    setConfirm(true)
  }

  return (
    <>
      <div className={`${selectedItems.length < 1 && 'hidden'}`}>
        <div className="flex items-center">
          <div className="hidden xl:block text-sm italic mr-2 whitespace-nowrap"><span>{selectedItems.length}</span> items selected</div>
          <button
            ref={trigger}
            className="btn bg-white border-slate-200 hover:border-slate-300 text-rose-500 hover:text-rose-600"
            onClick={handleClick}
          >
            Delete
          </button>
        </div>
      </div>
      <ConfirmAction
        trigger={trigger}
        modalOpen={confirm}
        setModalOpen={setConfirm}
        onOk={onOk}
        onCancel={onCancel}
      >
        {message}
      </ConfirmAction>
    </>
  );
}

export default DeleteButton;
import React from 'react'

const Label = ({status}) => {
    const color = (status) => {
        switch (status) {
            case 'Approved':
                return 'bg-emerald-100 text-emerald-600';
            case 'Not For Approval':
                return 'bg-red-100 text-red-600';
            default:
                return 'bg-slate-100 text-slate-500';
        }
    }

  return (
    <div className={`inline-flex font-medium rounded-full text-center px-2.5 py-0.5 ${color(status)}`}>{status}</div>
  )
}

export default Label
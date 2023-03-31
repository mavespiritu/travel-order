import React from 'react'

const Label = ({id, title, description, required}) => {
  return (
    <>
    <div className="flex-row justify-start w-full">
        <label className="block text-sm font-medium text-gray-600" htmlFor={id}>
            {title}
            { required && <span className="text-rose-500"> *</span> }
        </label>
        <p className="italic text-sm text-gray-600">{description}</p>
    </div>
    </>
  )
}

export default Label
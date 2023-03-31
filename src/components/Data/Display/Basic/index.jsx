const Display = ({
  title,
  subTitle = null,
  children
}) => {
  
  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        {
          subTitle
          &&
          <p className="mt-1 max-w-2xl text-sm text-gray-500">{subTitle}</p>
        }
      </div>
      <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-200">
          {children}
        </dl>
      </div>
    </div>
  )
}

export default Display
const ErrorMessage = ({message}) => {

    return (
      <div className="my-5">
        <div className="bg-red-100 text-red-600 px-3 py-2 rounded">
          <svg className="inline w-3 h-3 shrink-0 fill-current mr-2" viewBox="0 0 12 12">
            <path d="M10.28 1.28L3.989 7.575 1.695 5.28A1 1 0 00.28 6.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 1.28z" />
          </svg>
          <span className="text-sm">
          {message}
          </span>
        </div>
      </div>
    )
  }
  
  export default ErrorMessage
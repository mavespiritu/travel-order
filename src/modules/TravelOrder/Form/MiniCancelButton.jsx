const MiniCancelButton = ({
    className = '',
    children,
    onClick,
  }) => {
  
    const handleClick = (e) => {
      e.preventDefault()
      onClick()
    }
  
    return (
      <div className={className}>
        <button
          type="button"
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          onClick={handleClick}
        >
          {children}
        </button>
      </div>
    )
  }
  
  export default MiniCancelButton
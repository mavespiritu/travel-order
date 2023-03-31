const MiniSaveButton = ({
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
          className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          onClick={handleClick}
        >
          {children}
        </button>
      </div>
    )
  }
  
  export default MiniSaveButton
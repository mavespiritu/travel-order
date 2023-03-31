const MiniAddButton = ({
    children,
    onClick,
  }) => {
  
    const handleClick = (e) => {
      e.preventDefault()
      onClick()
    }
  
    return (
      <button
        type="button"
        className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleClick}
      >
        {children}
      </button>
    )
  }
  
  export default MiniAddButton
const MoreActions = ({
    left,
    right
  }) => {
  
    return (
      <>
        {/* More actions */}
        <div className="sm:flex sm:justify-between sm:items-center mb-5">
          {/* Left side */}
          <div className="mb-4 sm:mb-0">
            {left}
          </div>
          {/* Right side */}
          <div className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
            {right}
          </div>
        </div>
      </>
    )
  }
  
  export default MoreActions
const Row = ({
  children
}) => {

  return (
    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
      {children}
    </div>
  )
}

export default Row
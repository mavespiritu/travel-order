import Previous from "./Previous"
import Next from "./Next"

const PaginationClassic = ({
  pagination,
  currentPage,
  setCurrentPage,
}) => {

  // if (pagination?.total<=pagination?.per_page) {
  //   return null
  // }

  const start = parseInt(currentPage)>1 ? pagination?.per_page*(parseInt(currentPage)-1)+1 : 1
  const end = parseInt(currentPage)===pagination?.total_pages ? pagination?.total : pagination?.per_page*parseInt(currentPage)

  const handlePrevious = () => {
    setCurrentPage(currentPage-1)
  }

  const handleNext = () => {
    setCurrentPage(currentPage+1)
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <nav className="mb-4 sm:mb-0 sm:order-1" role="navigation" aria-label="Navigation">
          <ul className="flex justify-center">
            <Previous
              handleClick={handlePrevious}
              disabled={currentPage===1}
            />
            <Next
              handleClick={handleNext}
              disabled={currentPage===pagination?.total_pages}
            />
          </ul>
        </nav>
        {
          !isNaN(end)
          &&
          <div className="text-sm text-slate-500 text-center sm:text-left">
            Showing <span className="font-medium text-slate-600">{start}</span> to <span className="font-medium text-slate-600">{!isNaN(end)&&end}</span> of <span className="font-medium text-slate-600">{pagination?.total}</span> results
          </div>
        }
      </div>
    </div>
  )
}

export default PaginationClassic
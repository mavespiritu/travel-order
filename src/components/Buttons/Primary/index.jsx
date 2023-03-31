import Spinner from "../../Forms/Spinner"

const PrimaryButton = ({
  label,
  submitting,
  handleClick,
  trigger = null,
}) => {

  const onClick = (e) => {
    e.preventDefault()
    handleClick()
  }

  return (
    <div>
      <button ref={trigger} className="btn bg-blue-500 hover:bg-blue-600 text-white group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" onClick={onClick} disabled={submitting}>
        <span className="inline-block mt-0.5">
          <Spinner loading={submitting} />
        </span>
        <span>{label}</span>
      </button>
    </div>
  )
}

export default PrimaryButton

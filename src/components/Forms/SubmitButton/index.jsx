import Spinner from '../Spinner'

const SubmitButton = ({ title, submitting }) => {

  return (
    <>
      <button type="submit" className="btn bg-indigo-500 hover:bg-indigo-600 text-white group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" disabled={submitting}>
        <span className="inline-block mt-0.5">
          <Spinner loading={submitting} />
        </span>
        <span>{title}</span>
      </button>
    </>
  )
}

export default SubmitButton
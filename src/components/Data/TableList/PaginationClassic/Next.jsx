const Next = ({
  handleClick,
  disabled,
}) => {

  const onClick = (e) => {
    e.preventDefault()
    if (disabled) {
      return false
    }
    handleClick()
  }

  return (
    <li className="ml-3 first:ml-0">
      <a
        onClick={onClick}
        className={`btn bg-white border-slate-200${disabled?' text-slate-300 cursor-not-allowed':' hover:border-slate-300 text-indigo-500'}`}
        href="#0"
        disabled={disabled}
      >
        Next &gt;&gt;
      </a>
    </li>
  )
}

export default Next
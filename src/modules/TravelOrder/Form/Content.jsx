const Content = ({
    title,
    header = null,
    children
  }) => {
  
    return (
      <>
        <div className="p-4 space-y-6">
          <div className="flex">
            <h2 className="text-2xl text-slate-800 font-bold mb-5">{title}</h2>
            {header}
          </div>
        </div>
        <section>
          <div>
            {children}
          </div>
        </section>
      </>
    )
  }
  
  export default Content
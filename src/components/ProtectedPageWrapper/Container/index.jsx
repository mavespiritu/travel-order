const Container = ({children}) => {
  return (
    <main>
      <div className="px-4 sm:px-6 lg:px-8 pb-8 w-full mx-auto">  
        {children}
      </div>
    </main>
  )
}

export default Container
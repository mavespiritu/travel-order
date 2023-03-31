import React, { useState } from 'react'

import Sidebar from './Sidebar'
import Header from './Header'
import Container from './Container'

const ProtectedPageWrapper = ({
  title,
  children
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/*  Site Container */}
        <Container title={title} children={children} />

      </div>

    </div>
  )
}

export default ProtectedPageWrapper
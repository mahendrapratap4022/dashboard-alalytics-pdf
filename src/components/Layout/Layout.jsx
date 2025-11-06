import React, { useState } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './Layout.css'

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} />
      <div className={`main-content ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="main-header">
          <button className="menu-toggle" onClick={toggleSidebar}>
            ☰
          </button>
        </div>
        <div className="content-area">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Layout


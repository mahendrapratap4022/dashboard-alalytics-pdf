import React, { useState, useEffect } from 'react'
import Sidebar from '../Sidebar/Sidebar'
import './Layout.css'

const Layout = ({ children }) => {
  // Check if initial screen is mobile (<=768px)
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    return window.innerWidth > 768
  })

  useEffect(() => {
    // Handle window resize to auto-close sidebar on mobile
    const handleResize = () => {
      if (window.innerWidth <= 768 && sidebarOpen) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [sidebarOpen])

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      {sidebarOpen && window.innerWidth <= 768 && (
        <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
      )}
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


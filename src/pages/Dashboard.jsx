import React, { useState, useRef } from 'react'
import FilterSection from '../components/Dashboard/FilterSection'
import DataCards from '../components/Dashboard/DataCards'
import LineChartSection from '../components/Dashboard/LineChartSection'
import HorizontalChartSection from '../components/Dashboard/HorizontalChartSection'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import './Dashboard.css'

const Dashboard = () => {
  const [lastUpdated] = useState(new Date().toLocaleString())
  const printableRef = useRef(null)

  const handleExportPDF = async () => {
    if (!printableRef.current) return

    try {
      const element = printableRef.current
      
      // Wait for charts to fully render
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const canvas = await html2canvas(element, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        allowTaint: true,
        backgroundColor: '#ffffff',
        foreignObjectRendering: false,
        removeContainer: true,
        imageTimeout: 0,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.querySelector('.printable-content')
          if (clonedElement) {
            clonedElement.style.display = 'block'
            clonedElement.style.position = 'relative'
          }
          
          // Fix color() function issues by replacing with standard colors
          const allElements = clonedDoc.querySelectorAll('*')
          allElements.forEach((el) => {
            const styles = window.getComputedStyle(el)
            
            // Fix problematic color values
            if (styles.color && styles.color.includes('color(')) {
              el.style.color = 'rgb(0, 0, 0)'
            }
            if (styles.backgroundColor && styles.backgroundColor.includes('color(')) {
              el.style.backgroundColor = 'rgb(255, 255, 255)'
            }
            if (styles.fill && styles.fill.includes('color(')) {
              el.style.fill = 'currentColor'
            }
            if (styles.stroke && styles.stroke.includes('color(')) {
              el.style.stroke = 'currentColor'
            }
          })
        }
      })

      if (!canvas || canvas.width === 0 || canvas.height === 0) {
        throw new Error('Canvas generation failed')
      }

      const imgData = canvas.toDataURL('image/png', 1.0)
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      })

      const imgWidth = 210
      const pageHeight = 297
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`analytics-dashboard-${new Date().toISOString().split('T')[0]}.pdf`)
      console.log('PDF generated successfully')
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert(`PDF generation failed: ${error.message}. Please check the console for more details.`)
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard-top-header">
        <div className="header-title">
          <h1>Analytics</h1>
          <span className="last-updated">Last updated: {lastUpdated}</span>
        </div>
        <button className="export-btn" onClick={handleExportPDF}>
          Export as PDF
        </button>
      </div>

      <div ref={printableRef} className="printable-content">
        <FilterSection />
        <DataCards />
        <LineChartSection />
        <HorizontalChartSection />
      </div>
    </div>
  )
}

export default Dashboard


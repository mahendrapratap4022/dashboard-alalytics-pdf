import React, { useState, useRef, useEffect } from 'react'
import FilterSection from '../components/Dashboard/FilterSection'
import DataCards from '../components/Dashboard/DataCards'
import LineChartSection from '../components/Dashboard/LineChartSection'
import SecondLineChartSection from '../components/Dashboard/SecondLineChartSection'
import HorizontalChartSection from '../components/Dashboard/HorizontalChartSection'
import StackedBarChartSection from '../components/Dashboard/StackedBarChartSection'
import PieChartSection from '../components/Dashboard/PieChartSection'
import AreaChartSection from '../components/Dashboard/AreaChartSection'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import './Dashboard.css'

const Dashboard = () => {
  const [lastUpdated] = useState(new Date().toLocaleString())
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)
  const printableRef = useRef(null)

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = ''
      // Clean up any leftover clones
      const clones = document.querySelectorAll('[style*="-9999px"]')
      clones.forEach(clone => {
        if (clone.parentNode) {
          clone.parentNode.removeChild(clone)
        }
      })
    }
  }, [])

  const handleExportPDF = async () => {
    if (!printableRef.current) return

    try {
      // Show loading overlay and prevent scrolling
      setIsGeneratingPDF(true)
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'fixed'
      document.body.style.width = '100%'
      document.body.style.height = '100%'
      document.documentElement.style.overflow = 'hidden'
      
      // Small delay to ensure loading UI renders
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const element = printableRef.current
      
      // Force desktop layout on the actual element temporarily
      element.style.width = '1400px'
      element.style.minWidth = '1400px'
      element.style.maxWidth = '1400px'
      element.style.padding = '30px'
      
      // Force chart sections to full width
      const chartSections = element.querySelectorAll('.line-chart-section, .horizontal-chart-section')
      chartSections.forEach((section) => {
        section.style.width = '1340px'
        section.style.minWidth = '1340px'
        section.style.maxWidth = '1340px'
      })
      
      const chartContainers = element.querySelectorAll('.chart-container, .chart-wrapper')
      chartContainers.forEach((container) => {
        container.style.width = '1340px'
        container.style.minWidth = '1340px'
        container.style.maxWidth = '1340px'
        container.style.height = '500px'
        container.style.minHeight = '500px'
        
        // Also force the inner divs that hold AG Charts
        const agChartWrappers = container.querySelectorAll('div')
        agChartWrappers.forEach((div) => {
          div.style.width = '1340px'
          div.style.height = '500px'
        })
      })
      
      const cardsContainers = element.querySelectorAll('.cards-container')
      cardsContainers.forEach((container) => {
        container.style.gridTemplateColumns = '1fr 1fr 0.5fr'
        container.style.display = 'grid'
      })
      
      const mediumCardsWrappers = element.querySelectorAll('.medium-cards-wrapper')
      mediumCardsWrappers.forEach((wrapper) => {
        wrapper.style.gridTemplateColumns = 'repeat(3, 1fr)'
        wrapper.style.display = 'grid'
      })
      
      // Trigger multiple resize events
      window.dispatchEvent(new Event('resize'))
      await new Promise(resolve => setTimeout(resolve, 500))
      window.dispatchEvent(new Event('resize'))
      
      // Wait longer for charts to re-render at desktop size
      await new Promise(resolve => setTimeout(resolve, 2500))
      
      // A4 Landscape dimensions (in mm)
      const pdfWidth = 297
      const pdfHeight = 210
      const margin = 10 // 10mm margin
      const contentWidth = pdfWidth - (margin * 2)
      const contentHeight = pdfHeight - (margin * 2)
      
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: 'a4',
        compress: true
      })

      // Get all major sections
      const sections = [
        { element: element.querySelector('.filter-section'), name: 'Filters' },
        { element: element.querySelector('.data-cards-section'), name: 'Data Cards' },
        { element: element.querySelector('.line-chart-section'), name: 'Line Chart' },
        { element: element.querySelector('.horizontal-chart-section'), name: 'Horizontal Chart' },
        { element: element.querySelector('.stacked-bar-chart-section'), name: 'Stacked Bar Chart' },
        { element: element.querySelector('.pie-chart-section'), name: 'Pie Chart' },
        { element: element.querySelector('.area-chart-section'), name: 'Area Chart' }
      ].filter(section => section.element) // Only include sections that exist

      let currentY = margin
      let isFirstSection = true

      // Capture and add each section separately
      for (const section of sections) {
        console.log(`Capturing section: ${section.name}`)
        
        const sectionCanvas = await html2canvas(section.element, {
          scale: 2,
          useCORS: true,
          logging: false,
          allowTaint: true,
          backgroundColor: '#ffffff',
          windowWidth: 1400,
          onclone: (clonedDoc) => {
            // Fix color issues in clone
            const allElements = clonedDoc.querySelectorAll('*')
            allElements.forEach((el) => {
              try {
                const computedStyle = window.getComputedStyle(el)
                
                if (computedStyle.color && computedStyle.color.includes('color(')) {
                  el.style.setProperty('color', 'rgb(0, 0, 0)', 'important')
                }
                if (computedStyle.backgroundColor && computedStyle.backgroundColor.includes('color(')) {
                  el.style.setProperty('background-color', 'rgb(255, 255, 255)', 'important')
                }
              } catch (e) {
                // Skip
              }
            })
          }
        })

        // Calculate section dimensions in PDF
        const sectionImgWidth = contentWidth
        const sectionImgHeight = (sectionCanvas.height * contentWidth) / sectionCanvas.width
        
        // Check if section fits on current page
        if (!isFirstSection && (currentY + sectionImgHeight) > (pdfHeight - margin)) {
          // Section doesn't fit, start a new page
          pdf.addPage()
          currentY = margin
          console.log(`${section.name} moved to new page`)
        }

        // Add section image to PDF
        const sectionImgData = sectionCanvas.toDataURL('image/png', 1.0)
        pdf.addImage(sectionImgData, 'PNG', margin, currentY, sectionImgWidth, sectionImgHeight, undefined, 'FAST')
        
        // Update position for next section
        currentY += sectionImgHeight + 5 // 5mm gap between sections
        isFirstSection = false
        
        console.log(`${section.name} added, new Y position: ${currentY}`)
      }

      pdf.save(`analytics-dashboard-${new Date().toISOString().split('T')[0]}.pdf`)
      console.log('PDF generated successfully')
      
      // Show success message briefly before reload
      await new Promise(resolve => setTimeout(resolve, 500))
      
      // Reload page to restore everything to normal
      window.location.reload()
    } catch (error) {
      console.error('Error generating PDF:', error)
      
      // Restore body styles before showing alert
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.width = ''
      document.body.style.height = ''
      document.documentElement.style.overflow = ''
      
      alert(`PDF generation failed: ${error.message}. Please check the console for more details.`)
      
      // Reload page even on error to restore state
      window.location.reload()
    }
  }

  return (
    <div className="dashboard">
      {isGeneratingPDF && (
        <div className="pdf-loading-overlay">
          <div className="pdf-loading-content">
            <div className="pdf-spinner"></div>
            <h2>Generating PDF...</h2>
            <p>Please wait while we prepare your document</p>
          </div>
        </div>
      )}
      
      <div className="dashboard-top-header">
        <div className="header-title">
          <h1>Analytics</h1>
          <span className="last-updated">Last updated: {lastUpdated}</span>
        </div>
        <button 
          className="export-btn" 
          onClick={handleExportPDF}
          disabled={isGeneratingPDF}
        >
          {isGeneratingPDF ? 'Generating...' : 'Export as PDF'}
        </button>
      </div>

      <div ref={printableRef} className="printable-content">
        <FilterSection />
        <DataCards />
        <LineChartSection />
        <SecondLineChartSection />
        <HorizontalChartSection />
        <StackedBarChartSection />
        <PieChartSection />
        <AreaChartSection />
      </div>
    </div>
  )
}

export default Dashboard


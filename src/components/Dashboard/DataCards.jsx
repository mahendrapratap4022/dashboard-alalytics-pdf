import React from 'react'
import './DataCards.css'

const DataCards = ({ toDate }) => {
  // Format the date for display
  const formattedDate = toDate ? new Date(toDate).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  }) : ''

  return (
    <div className="data-cards-section">
      <div className="cards-container">
        {/* Large Revenue Card - Col 6 */}
        <div className="card large-card revenue-card">
          <h3>Estimated Revenue</h3>
          <div className="revenue-formula">
            <div className="formula-item">
              <span className="label">Total Est. Allowed</span>
              <span className="value">$125,450.00</span>
            </div>
            <span className="operator">-</span>
            <div className="formula-item">
              <span className="label">Total COGS</span>
              <span className="value">$45,230.00</span>
            </div>
            <span className="operator">=</span>
            <div className="formula-item result">
              <span className="label">Est. Revenue</span>
              <span className="value highlight">$80,220.00</span>
            </div>
          </div>
        </div>

        {/* Medium Cards Grid - Col 5 */}
        <div className="medium-cards-wrapper">
          <div className="medium-card yellow-card">
            <span className="card-value">1,245</span>
            <span className="card-label">Dispensed Units</span>
          </div>
          <div className="medium-card yellow-card">
            <span className="card-value">$145,890</span>
            <span className="card-label">Purchased Units</span>
          </div>
          <div className="medium-card yellow-card">
            <span className="card-value">$125,450</span>
            <span className="card-label">Quantity on Hand {formattedDate}</span>
          </div>
          <div className="medium-card yellow-card">
            <span className="card-value">$117.20</span>
            <span className="card-label">Total Charges</span>
          </div>
          <div className="medium-card yellow-card">
            <span className="card-value">342</span>
            <span className="card-label">Total Purchases</span>
          </div>
          <div className="medium-card yellow-card">
            <span className="card-value">28</span>
            <span className="card-label">Total Stock Value {formattedDate}</span>
          </div>
        </div>

        {/* Additional Metric Cards */}
        <div className="side-cards-wrapper">
          <div className="side-card purple-card">
            <span className="card-value">92%</span>
            <span className="card-label">Patient Refused</span>
          </div>
          <div className="side-card purple-card">
            <span className="card-value">4.5 days</span>
            <span className="card-label">Visit Discarded</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataCards


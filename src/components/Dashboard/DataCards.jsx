import React from 'react'
import './DataCards.css'

const DataCards = () => {
  return (
    <div className="data-cards-section">
      <h2 className="section-title">Key Metrics</h2>
      
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
            <span className="card-label">Total Units</span>
            <span className="card-value">1,245</span>
          </div>
          <div className="medium-card yellow-card">
            <span className="card-label">Total Charged</span>
            <span className="card-value">$145,890</span>
          </div>
          <div className="medium-card yellow-card">
            <span className="card-label">Total Allowed</span>
            <span className="card-value">$125,450</span>
          </div>
          <div className="medium-card yellow-card">
            <span className="card-label">Avg Unit Price</span>
            <span className="card-value">$117.20</span>
          </div>
          <div className="medium-card yellow-card">
            <span className="card-label">Total Orders</span>
            <span className="card-value">342</span>
          </div>
          <div className="medium-card yellow-card">
            <span className="card-label">Pending Orders</span>
            <span className="card-value">28</span>
          </div>
        </div>

        {/* Additional Metric Cards */}
        <div className="side-cards-wrapper">
          <div className="side-card purple-card">
            <span className="card-label">Completion Rate</span>
            <span className="card-value">92%</span>
            <span className="card-trend positive">↑ 5.2%</span>
          </div>
          <div className="side-card purple-card">
            <span className="card-label">Avg Delivery Time</span>
            <span className="card-value">4.5 days</span>
            <span className="card-trend positive">↓ 0.8 days</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataCards


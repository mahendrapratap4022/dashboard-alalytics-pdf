import React, { useState } from 'react'
import './FilterSection.css'

const FilterSection = () => {
  const [filters, setFilters] = useState({
    dateOfService: '',
    stockLocation: 'All',
    provider: 'All',
    hcpcs: 'All',
    fitter: 'All',
    visitStatus: 'All',
    fromDate: '',
    toDate: '',
    itemCategory: 'All',
    bilType: 'All',
    itemNumber: 'All',
  })

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value })
  }

  const handleReset = () => {
    setFilters({
      dateOfService: '',
      stockLocation: 'All',
      provider: 'All',
      hcpcs: 'All',
      fitter: 'All',
      visitStatus: 'All',
      fromDate: '',
      toDate: '',
      itemCategory: 'All',
      bilType: 'All',
      itemNumber: 'All',
    })
  }

  const handleApply = () => {
    console.log('Applying filters:', filters)
    // Apply filter logic here
  }

  return (
    <div className="filter-section">
      <h2 className="section-title">Advanced Filters</h2>
      
      <div className="filter-row">
        <div className="filter-item">
          <label>Date of Service</label>
          <input
            type="date"
            value={filters.dateOfService}
            onChange={(e) => handleFilterChange('dateOfService', e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label>Stock Location</label>
          <select
            value={filters.stockLocation}
            onChange={(e) => handleFilterChange('stockLocation', e.target.value)}
          >
            <option value="All">All</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Provider</label>
          <select
            value={filters.provider}
            onChange={(e) => handleFilterChange('provider', e.target.value)}
          >
            <option value="All">All</option>
          </select>
        </div>

        <div className="filter-item">
          <label>HCPCS</label>
          <select
            value={filters.hcpcs}
            onChange={(e) => handleFilterChange('hcpcs', e.target.value)}
          >
            <option value="All">All</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Fitter</label>
          <select
            value={filters.fitter}
            onChange={(e) => handleFilterChange('fitter', e.target.value)}
          >
            <option value="All">All</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Visit Status</label>
          <select
            value={filters.visitStatus}
            onChange={(e) => handleFilterChange('visitStatus', e.target.value)}
          >
            <option value="All">All</option>
          </select>
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-item">
          <label>From Date</label>
          <input
            type="date"
            value={filters.fromDate}
            onChange={(e) => handleFilterChange('fromDate', e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label>To Date</label>
          <input
            type="date"
            value={filters.toDate}
            onChange={(e) => handleFilterChange('toDate', e.target.value)}
          />
        </div>

        <div className="filter-item">
          <label>Item Category Name</label>
          <select
            value={filters.itemCategory}
            onChange={(e) => handleFilterChange('itemCategory', e.target.value)}
          >
            <option value="All">All</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Bil Type</label>
          <select
            value={filters.bilType}
            onChange={(e) => handleFilterChange('bilType', e.target.value)}
          >
            <option value="All">All</option>
          </select>
        </div>

        <div className="filter-item">
          <label>Item Number</label>
          <select
            value={filters.itemNumber}
            onChange={(e) => handleFilterChange('itemNumber', e.target.value)}
          >
            <option value="All">All</option>
          </select>
        </div>
      </div>

      <div className="filter-actions">
        <button className="reset-btn" onClick={handleReset}>
          Reset to Default
        </button>
        <button className="apply-btn" onClick={handleApply}>
          Apply
        </button>
      </div>
    </div>
  )
}

export default FilterSection


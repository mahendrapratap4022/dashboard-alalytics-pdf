import React, { useState, useEffect } from 'react'
import './FilterSection.css'

const FilterSection = () => {
  const [filters, setFilters] = useState({
    dateOfService: '3months',
    stockLocation: [],
    provider: [],
    hcpcs: [],
    fitter: [],
    visitStatus: [],
    fromDate: '',
    toDate: '',
    itemCategory: [],
    bilType: [],
    itemNumber: [],
  })

  const [openDropdown, setOpenDropdown] = useState(null)

  const [isPdfMode, setIsPdfMode] = useState(false)

  useEffect(() => {
    const checkPdfMode = () => {
      setIsPdfMode(document.body.classList.contains('generating-pdf'))
    }
    
    checkPdfMode()
    
    const observer = new MutationObserver(checkPdfMode)
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.multi-select-wrapper')) {
        setOpenDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Define all available options for each filter
  const filterOptions = {
    dateOfService: ['1 Month', '2 Months', '3 Months', 'Custom Date Range'],
    stockLocation: ['Warehouse A', 'Warehouse B', 'Warehouse C', 'Main Storage', 'Regional Hub'],
    provider: ['Dr. Smith', 'Dr. Johnson', 'Dr. Williams', 'Dr. Brown', 'Dr. Davis', 'Dr. Martinez'],
    hcpcs: ['E0143 - Walker', 'E1390 - Oxygen Concentrator', 'E0260 - Hospital Bed', 'K0001 - Standard Wheelchair', 'E0601 - CPAP Device', 'E0235 - Bed Rails'],
    fitter: ['John Anderson', 'Sarah Mitchell', 'Mike Thompson', 'Emily Rodriguez', 'David Chen'],
    visitStatus: ['Scheduled', 'Completed', 'In Progress', 'Cancelled', 'Pending', 'Rescheduled'],
    itemCategory: ['Wheelchairs', 'Walkers', 'Hospital Beds', 'Oxygen Equipment', 'Mobility Aids', 'Respiratory'],
    bilType: ['Insurance', 'Medicare', 'Medicaid', 'Private Pay', 'Workers Comp'],
    itemNumber: Array.from({ length: 200 }, (_, i) => `ITM-${String(i + 1).padStart(4, '0')}`)
  }

  const getFilterDisplayValue = (key, value) => {
    if (key === 'dateOfService') {
      if (value === '1month') return '1 Month'
      if (value === '2months') return '2 Months'
      if (value === '3months') return '3 Months'
      if (value === 'custom') return 'Custom Date Range'
    }
    if (Array.isArray(value)) {
      // If nothing selected, show "None Selected"
      if (value.length === 0) {
        return 'None Selected'
      }
      // Always show the actual selected values, even if all are selected
      return value.join(', ')
    }
    return value || 'Not Set'
  }

  const handleMultiSelectChange = (field, option) => {
    const currentValues = filters[field]
    let newValues
    
    if (currentValues.includes(option)) {
      newValues = currentValues.filter(item => item !== option)
    } else {
      newValues = [...currentValues, option]
    }
    
    setFilters({ ...filters, [field]: newValues })
  }

  const handleSelectAll = (field) => {
    const allOptions = filterOptions[field]
    const currentValues = filters[field]
    
    // If all are selected, deselect all. Otherwise, select all.
    if (currentValues.length === allOptions.length) {
      setFilters({ ...filters, [field]: [] })
    } else {
      setFilters({ ...filters, [field]: [...allOptions] })
    }
  }

  const isAllSelected = (field) => {
    const allOptions = filterOptions[field]
    const currentValues = filters[field]
    return currentValues.length === allOptions.length
  }

  const getDisplayText = (field) => {
    const selected = filters[field]
    const allOptions = filterOptions[field]
    if (selected.length === 0) return 'Select...'
    if (selected.length === allOptions.length) return 'All'
    if (selected.length === 1) return selected[0]
    return `${selected.length} selected`
  }

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value })
  }

  // Check if custom date range is selected
  const isCustomDateRange = filters.dateOfService === 'custom'

  const handleReset = () => {
    setFilters({
      dateOfService: '3months',
      stockLocation: [],
      provider: [],
      hcpcs: [],
      fitter: [],
      visitStatus: [],
      fromDate: '',
      toDate: '',
      itemCategory: [],
      bilType: [],
      itemNumber: [],
    })
    setOpenDropdown(null)
  }

  const handleApply = () => {
    console.log('Applying filters:', filters)
    // Apply filter logic here
  }

  // PDF Mode: Show filter summary
  if (isPdfMode) {
    return (
      <div className="filter-section pdf-filter-summary">
        <h3 className="pdf-summary-title">Applied Filters</h3>
        <div className="pdf-summary-grid">
          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Date of Service:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('dateOfService', filters.dateOfService)}</span>
          </div>

          {filters.dateOfService === 'custom' && (
            <>
              <div className="pdf-summary-item">
                <span className="pdf-summary-label">From Date:</span>
                <span className="pdf-summary-value">{filters.fromDate || 'Not Set'}</span>
              </div>
              <div className="pdf-summary-item">
                <span className="pdf-summary-label">To Date:</span>
                <span className="pdf-summary-value">{filters.toDate || 'Not Set'}</span>
              </div>
            </>
          )}

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Stock Location:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('stockLocation', filters.stockLocation)}</span>
          </div>

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Provider:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('provider', filters.provider)}</span>
          </div>

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">HCPCS:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('hcpcs', filters.hcpcs)}</span>
          </div>

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Fitter:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('fitter', filters.fitter)}</span>
          </div>

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Visit Status:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('visitStatus', filters.visitStatus)}</span>
          </div>

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Item Category:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('itemCategory', filters.itemCategory)}</span>
          </div>

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Bil Type:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('bilType', filters.bilType)}</span>
          </div>

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">Item Number:</span>
            <span className="pdf-summary-value">{getFilterDisplayValue('itemNumber', filters.itemNumber)}</span>
          </div>
        </div>
      </div>
    )
  }

  // Normal Mode: Show filter form
  return (
    <div className="filter-section">
      <div className="filter-grid">
        <div className="filter-column">
          <div className="date-filter-box">
            <div className="filter-item">
              <label>Date of Service</label>
              <select
                value={filters.dateOfService}
                onChange={(e) => handleFilterChange('dateOfService', e.target.value)}
              >
                <option value="1month">1 Month</option>
                <option value="2months">2 Months</option>
                <option value="3months">3 Months</option>
                <option value="custom">Custom Date Range</option>
              </select>
            </div>

            <div className="date-range-row">
              <div className="filter-item">
                <label>From Date</label>
                <input
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) => handleFilterChange('fromDate', e.target.value)}
                  disabled={!isCustomDateRange}
                />
              </div>

              <div className="filter-item">
                <label>To Date</label>
                <input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) => handleFilterChange('toDate', e.target.value)}
                  disabled={!isCustomDateRange}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="filter-column">
          <div className="filter-item">
            <label>Stock Location</label>
            <div className="multi-select-wrapper">
              <div 
                className="multi-select-display"
                onClick={() => setOpenDropdown(openDropdown === 'stockLocation' ? null : 'stockLocation')}
              >
                {getDisplayText('stockLocation')}
                <span className="dropdown-arrow">▼</span>
              </div>
              {openDropdown === 'stockLocation' && (
                <div className="multi-select-dropdown">
                  <label className="checkbox-option all-option">
                    <input
                      type="checkbox"
                      checked={isAllSelected('stockLocation')}
                      onChange={() => handleSelectAll('stockLocation')}
                    />
                    <span><strong>All</strong></span>
                  </label>
                  <div className="dropdown-divider"></div>
                  {filterOptions.stockLocation.map(option => (
                    <label key={option} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={filters.stockLocation.includes(option)}
                        onChange={() => handleMultiSelectChange('stockLocation', option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="filter-item">
            <label>Item Category Name</label>
            <div className="multi-select-wrapper">
              <div 
                className="multi-select-display"
                onClick={() => setOpenDropdown(openDropdown === 'itemCategory' ? null : 'itemCategory')}
              >
                {getDisplayText('itemCategory')}
                <span className="dropdown-arrow">▼</span>
              </div>
              {openDropdown === 'itemCategory' && (
                <div className="multi-select-dropdown">
                  <label className="checkbox-option all-option">
                    <input
                      type="checkbox"
                      checked={isAllSelected('itemCategory')}
                      onChange={() => handleSelectAll('itemCategory')}
                    />
                    <span><strong>All</strong></span>
                  </label>
                  <div className="dropdown-divider"></div>
                  {filterOptions.itemCategory.map(option => (
                    <label key={option} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={filters.itemCategory.includes(option)}
                        onChange={() => handleMultiSelectChange('itemCategory', option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="filter-column">
          <div className="filter-item">
            <label>Provider</label>
            <div className="multi-select-wrapper">
              <div 
                className="multi-select-display"
                onClick={() => setOpenDropdown(openDropdown === 'provider' ? null : 'provider')}
              >
                {getDisplayText('provider')}
                <span className="dropdown-arrow">▼</span>
              </div>
              {openDropdown === 'provider' && (
                <div className="multi-select-dropdown">
                  <label className="checkbox-option all-option">
                    <input
                      type="checkbox"
                      checked={isAllSelected('provider')}
                      onChange={() => handleSelectAll('provider')}
                    />
                    <span><strong>All</strong></span>
                  </label>
                  <div className="dropdown-divider"></div>
                  {filterOptions.provider.map(option => (
                    <label key={option} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={filters.provider.includes(option)}
                        onChange={() => handleMultiSelectChange('provider', option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="filter-item">
            <label>Bil Type</label>
            <div className="multi-select-wrapper">
              <div 
                className="multi-select-display"
                onClick={() => setOpenDropdown(openDropdown === 'bilType' ? null : 'bilType')}
              >
                {getDisplayText('bilType')}
                <span className="dropdown-arrow">▼</span>
              </div>
              {openDropdown === 'bilType' && (
                <div className="multi-select-dropdown">
                  <label className="checkbox-option all-option">
                    <input
                      type="checkbox"
                      checked={isAllSelected('bilType')}
                      onChange={() => handleSelectAll('bilType')}
                    />
                    <span><strong>All</strong></span>
                  </label>
                  <div className="dropdown-divider"></div>
                  {filterOptions.bilType.map(option => (
                    <label key={option} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={filters.bilType.includes(option)}
                        onChange={() => handleMultiSelectChange('bilType', option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="filter-column">
          <div className="filter-item">
            <label>HCPCS</label>
            <div className="multi-select-wrapper">
              <div 
                className="multi-select-display"
                onClick={() => setOpenDropdown(openDropdown === 'hcpcs' ? null : 'hcpcs')}
              >
                {getDisplayText('hcpcs')}
                <span className="dropdown-arrow">▼</span>
              </div>
              {openDropdown === 'hcpcs' && (
                <div className="multi-select-dropdown">
                  <label className="checkbox-option all-option">
                    <input
                      type="checkbox"
                      checked={isAllSelected('hcpcs')}
                      onChange={() => handleSelectAll('hcpcs')}
                    />
                    <span><strong>All</strong></span>
                  </label>
                  <div className="dropdown-divider"></div>
                  {filterOptions.hcpcs.map(option => (
                    <label key={option} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={filters.hcpcs.includes(option)}
                        onChange={() => handleMultiSelectChange('hcpcs', option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="filter-item">
            <label>Item Number</label>
            <div className="multi-select-wrapper">
              <div 
                className="multi-select-display"
                onClick={() => setOpenDropdown(openDropdown === 'itemNumber' ? null : 'itemNumber')}
              >
                {getDisplayText('itemNumber')}
                <span className="dropdown-arrow">▼</span>
              </div>
              {openDropdown === 'itemNumber' && (
                <div className="multi-select-dropdown">
                  <label className="checkbox-option all-option">
                    <input
                      type="checkbox"
                      checked={isAllSelected('itemNumber')}
                      onChange={() => handleSelectAll('itemNumber')}
                    />
                    <span><strong>All</strong></span>
                  </label>
                  <div className="dropdown-divider"></div>
                  {filterOptions.itemNumber.map(option => (
                    <label key={option} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={filters.itemNumber.includes(option)}
                        onChange={() => handleMultiSelectChange('itemNumber', option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="filter-column">
          <div className="filter-item">
            <label>Fitter</label>
            <div className="multi-select-wrapper">
              <div 
                className="multi-select-display"
                onClick={() => setOpenDropdown(openDropdown === 'fitter' ? null : 'fitter')}
              >
                {getDisplayText('fitter')}
                <span className="dropdown-arrow">▼</span>
              </div>
              {openDropdown === 'fitter' && (
                <div className="multi-select-dropdown">
                  <label className="checkbox-option all-option">
                    <input
                      type="checkbox"
                      checked={isAllSelected('fitter')}
                      onChange={() => handleSelectAll('fitter')}
                    />
                    <span><strong>All</strong></span>
                  </label>
                  <div className="dropdown-divider"></div>
                  {filterOptions.fitter.map(option => (
                    <label key={option} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={filters.fitter.includes(option)}
                        onChange={() => handleMultiSelectChange('fitter', option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="reset-btn" onClick={handleReset}>
            Reset to Default
          </button>
        </div>

        <div className="filter-column">
          <div className="filter-item">
            <label>Visit Status</label>
            <div className="multi-select-wrapper">
              <div 
                className="multi-select-display"
                onClick={() => setOpenDropdown(openDropdown === 'visitStatus' ? null : 'visitStatus')}
              >
                {getDisplayText('visitStatus')}
                <span className="dropdown-arrow">▼</span>
              </div>
              {openDropdown === 'visitStatus' && (
                <div className="multi-select-dropdown">
                  <label className="checkbox-option all-option">
                    <input
                      type="checkbox"
                      checked={isAllSelected('visitStatus')}
                      onChange={() => handleSelectAll('visitStatus')}
                    />
                    <span><strong>All</strong></span>
                  </label>
                  <div className="dropdown-divider"></div>
                  {filterOptions.visitStatus.map(option => (
                    <label key={option} className="checkbox-option">
                      <input
                        type="checkbox"
                        checked={filters.visitStatus.includes(option)}
                        onChange={() => handleMultiSelectChange('visitStatus', option)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button className="apply-btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}

export default FilterSection


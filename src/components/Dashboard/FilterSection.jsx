import React, { useState, useEffect } from 'react'
import './FilterSection.css'
import providersData from '../../data/providers.json'
import hcpcsData from '../../data/hcpcs_codes.json'
import itemCategoryData from '../../data/item_category.json'
import locationsData from '../../data/locations.json'
import billingTypeData from '../../data/billing_type.json'

const FilterSection = ({ onFiltersChange }) => {
  // Define all available options for each filter
  const filterOptions = {
    dateOfService: [
      'Last Day',
      'Last Week',
      'Last 15 Days',
      'Last 1 Month',
      'Three Months',
      'Six Months',
      'Eight Months',
      'Twelve Months',
      'Last Calendar Month',
      'This Calendar Month',
      'Last 6 Calendar Months',
      'Last Calendar Week (Mon-Sun)',
      'This Calendar Week (Mon-Sun)',
      'Last Calendar Quarter',
      'This Calendar Quarter',
      'This Calendar Year',
      'Last Calendar Year'
    ],
    stockLocation: locationsData.locations,
    provider: providersData.providers.map(p => p.Name),
    hcpcs: hcpcsData.hcpcs_codes,
    fitter: providersData.providers.map(p => p.Name).slice(0, 15),
    visitStatus: ['Scheduled', 'Completed', 'In Progress', 'Cancelled', 'Pending', 'Rescheduled'],
    itemCategory: itemCategoryData.item_category,
    bilType: billingTypeData.billing_type,
    itemNumber: Array.from({ length: 200 }, (_, i) => `ITM-${String(i + 1).padStart(4, '0')}`)
  }

  // Calculate initial date range for 3 months
  const getInitialDates = () => {
    const today = new Date()
    const threeMonthsAgo = new Date(today)
    threeMonthsAgo.setMonth(today.getMonth() - 3)
    return {
      fromDate: threeMonthsAgo.toISOString().split('T')[0],
      toDate: today.toISOString().split('T')[0]
    }
  }

  const initialDates = getInitialDates()

  const [filters, setFilters] = useState({
    dateOfService: 'Three Months',
    stockLocation: [...filterOptions.stockLocation],
    provider: [...filterOptions.provider],
    hcpcs: [...filterOptions.hcpcs],
    fitter: [...filterOptions.fitter],
    visitStatus: [...filterOptions.visitStatus],
    fromDate: initialDates.fromDate,
    toDate: initialDates.toDate,
    itemCategory: [...filterOptions.itemCategory],
    bilType: [...filterOptions.bilType],
    itemNumber: [...filterOptions.itemNumber],
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

  useEffect(() => {
    if (onFiltersChange) {
      onFiltersChange(filters)
    }
  }, [filters, onFiltersChange])

  const getFilterDisplayValue = (key, value) => {
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

  // Helper function to determine if filter should be full width
  const shouldBeFullWidth = (filterValue) => {
    if (Array.isArray(filterValue)) {
      return filterValue.length > 30
    }
    return false
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
    if (field === 'dateOfService') {
      // Calculate date range based on selection
      const today = new Date()
      let fromDate = ''
      let toDate = today.toISOString().split('T')[0]
      
      switch (value) {
        case 'Last Day':
          const yesterday = new Date(today)
          yesterday.setDate(today.getDate() - 1)
          fromDate = yesterday.toISOString().split('T')[0]
          toDate = yesterday.toISOString().split('T')[0]
          break
          
        case 'Last Week':
          const lastWeek = new Date(today)
          lastWeek.setDate(today.getDate() - 7)
          fromDate = lastWeek.toISOString().split('T')[0]
          break
          
        case 'Last 15 Days':
          const last15Days = new Date(today)
          last15Days.setDate(today.getDate() - 15)
          fromDate = last15Days.toISOString().split('T')[0]
          break
          
        case 'Last 1 Month':
          const lastMonth = new Date(today)
          lastMonth.setMonth(today.getMonth() - 1)
          fromDate = lastMonth.toISOString().split('T')[0]
          break
          
        case 'Three Months':
          const threeMonths = new Date(today)
          threeMonths.setMonth(today.getMonth() - 3)
          fromDate = threeMonths.toISOString().split('T')[0]
          break
          
        case 'Six Months':
          const sixMonths = new Date(today)
          sixMonths.setMonth(today.getMonth() - 6)
          fromDate = sixMonths.toISOString().split('T')[0]
          break
          
        case 'Eight Months':
          const eightMonths = new Date(today)
          eightMonths.setMonth(today.getMonth() - 8)
          fromDate = eightMonths.toISOString().split('T')[0]
          break
          
        case 'Twelve Months':
          const twelveMonths = new Date(today)
          twelveMonths.setMonth(today.getMonth() - 12)
          fromDate = twelveMonths.toISOString().split('T')[0]
          break
          
        case 'Last Calendar Month':
          const lastCalMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1)
          const lastCalMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)
          fromDate = lastCalMonth.toISOString().split('T')[0]
          toDate = lastCalMonthEnd.toISOString().split('T')[0]
          break
          
        case 'This Calendar Month':
          const thisCalMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)
          fromDate = thisCalMonthStart.toISOString().split('T')[0]
          toDate = today.toISOString().split('T')[0]
          break
          
        case 'Last 6 Calendar Months':
          const last6CalMonths = new Date(today.getFullYear(), today.getMonth() - 6, 1)
          fromDate = last6CalMonths.toISOString().split('T')[0]
          break
          
        case 'Last Calendar Week (Mon-Sun)':
          const lastWeekEnd = new Date(today)
          const dayOfWeek = today.getDay()
          const daysToLastSunday = dayOfWeek === 0 ? 7 : dayOfWeek
          lastWeekEnd.setDate(today.getDate() - daysToLastSunday)
          const lastWeekStart = new Date(lastWeekEnd)
          lastWeekStart.setDate(lastWeekEnd.getDate() - 6)
          fromDate = lastWeekStart.toISOString().split('T')[0]
          toDate = lastWeekEnd.toISOString().split('T')[0]
          break
          
        case 'This Calendar Week (Mon-Sun)':
          const thisWeekStart = new Date(today)
          const currentDayOfWeek = today.getDay()
          const daysFromMonday = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1
          thisWeekStart.setDate(today.getDate() - daysFromMonday)
          fromDate = thisWeekStart.toISOString().split('T')[0]
          toDate = today.toISOString().split('T')[0]
          break
          
        case 'Last Calendar Quarter':
          const currentQuarter = Math.floor(today.getMonth() / 3)
          const lastQuarterStart = new Date(today.getFullYear(), (currentQuarter - 1) * 3, 1)
          const lastQuarterEnd = new Date(today.getFullYear(), currentQuarter * 3, 0)
          
          // Handle when we're in Q1 (need to go back to previous year Q4)
          if (currentQuarter === 0) {
            lastQuarterStart.setFullYear(today.getFullYear() - 1)
            lastQuarterStart.setMonth(9) // October (Q4 starts in month 9)
            lastQuarterEnd.setFullYear(today.getFullYear() - 1)
            lastQuarterEnd.setMonth(11)
            lastQuarterEnd.setDate(31) // December 31
          }
          
          fromDate = lastQuarterStart.toISOString().split('T')[0]
          toDate = lastQuarterEnd.toISOString().split('T')[0]
          break
          
        case 'This Calendar Quarter':
          const thisQuarter = Math.floor(today.getMonth() / 3)
          const thisQuarterStart = new Date(today.getFullYear(), thisQuarter * 3, 1)
          fromDate = thisQuarterStart.toISOString().split('T')[0]
          toDate = today.toISOString().split('T')[0]
          break
          
        case 'This Calendar Year':
          const thisYearStart = new Date(today.getFullYear(), 0, 1)
          fromDate = thisYearStart.toISOString().split('T')[0]
          toDate = today.toISOString().split('T')[0]
          break
          
        case 'Last Calendar Year':
          const lastYearStart = new Date(today.getFullYear() - 1, 0, 1)
          const lastYearEnd = new Date(today.getFullYear() - 1, 11, 31)
          fromDate = lastYearStart.toISOString().split('T')[0]
          toDate = lastYearEnd.toISOString().split('T')[0]
          break
          
        default:
          // Keep existing dates if unknown option
          fromDate = filters.fromDate
          toDate = filters.toDate
      }
      
      setFilters({ ...filters, [field]: value, fromDate, toDate })
    } else {
      setFilters({ ...filters, [field]: value })
    }
  }

  const handleReset = () => {
    const resetDates = getInitialDates()
    setFilters({
      dateOfService: 'Three Months',
      stockLocation: [...filterOptions.stockLocation],
      provider: [...filterOptions.provider],
      hcpcs: [...filterOptions.hcpcs],
      fitter: [...filterOptions.fitter],
      visitStatus: [...filterOptions.visitStatus],
      fromDate: resetDates.fromDate,
      toDate: resetDates.toDate,
      itemCategory: [...filterOptions.itemCategory],
      bilType: [...filterOptions.bilType],
      itemNumber: [...filterOptions.itemNumber],
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
          {/* 6-column filters (top) - filters with ≤30 items */}
          <div className="pdf-summary-item">
            <span className="pdf-summary-label">From Date:</span>
            <span className="pdf-summary-value">{filters.fromDate || 'Not Set'}</span>
          </div>

          <div className="pdf-summary-item">
            <span className="pdf-summary-label">To Date:</span>
            <span className="pdf-summary-value">{filters.toDate || 'Not Set'}</span>
          </div>

          {!shouldBeFullWidth(filters.stockLocation) && (
            <div className="pdf-summary-item">
              <span className="pdf-summary-label">Stock Location:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('stockLocation', filters.stockLocation)}</span>
            </div>
          )}

          {!shouldBeFullWidth(filters.provider) && (
            <div className="pdf-summary-item">
              <span className="pdf-summary-label">Provider:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('provider', filters.provider)}</span>
            </div>
          )}

          {!shouldBeFullWidth(filters.hcpcs) && (
            <div className="pdf-summary-item">
              <span className="pdf-summary-label">HCPCS:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('hcpcs', filters.hcpcs)}</span>
            </div>
          )}

          {!shouldBeFullWidth(filters.fitter) && (
            <div className="pdf-summary-item">
              <span className="pdf-summary-label">Fitter:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('fitter', filters.fitter)}</span>
            </div>
          )}

          {!shouldBeFullWidth(filters.visitStatus) && (
            <div className="pdf-summary-item">
              <span className="pdf-summary-label">Visit Status:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('visitStatus', filters.visitStatus)}</span>
            </div>
          )}

          {!shouldBeFullWidth(filters.bilType) && (
            <div className="pdf-summary-item">
              <span className="pdf-summary-label">Bil Type:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('bilType', filters.bilType)}</span>
            </div>
          )}

          {!shouldBeFullWidth(filters.itemCategory) && (
            <div className="pdf-summary-item">
              <span className="pdf-summary-label">Item Category:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('itemCategory', filters.itemCategory)}</span>
            </div>
          )}

          {!shouldBeFullWidth(filters.itemNumber) && (
            <div className="pdf-summary-item">
              <span className="pdf-summary-label">Item Number:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('itemNumber', filters.itemNumber)}</span>
            </div>
          )}

          {/* 12-column filters (bottom) - filters with >30 items */}
          {shouldBeFullWidth(filters.stockLocation) && (
            <div className="pdf-summary-item pdf-summary-item-full">
              <span className="pdf-summary-label">Stock Location:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('stockLocation', filters.stockLocation)}</span>
            </div>
          )}

          {shouldBeFullWidth(filters.provider) && (
            <div className="pdf-summary-item pdf-summary-item-full">
              <span className="pdf-summary-label">Provider:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('provider', filters.provider)}</span>
            </div>
          )}

          {shouldBeFullWidth(filters.hcpcs) && (
            <div className="pdf-summary-item pdf-summary-item-full">
              <span className="pdf-summary-label">HCPCS:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('hcpcs', filters.hcpcs)}</span>
            </div>
          )}

          {shouldBeFullWidth(filters.fitter) && (
            <div className="pdf-summary-item pdf-summary-item-full">
              <span className="pdf-summary-label">Fitter:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('fitter', filters.fitter)}</span>
            </div>
          )}

          {shouldBeFullWidth(filters.visitStatus) && (
            <div className="pdf-summary-item pdf-summary-item-full">
              <span className="pdf-summary-label">Visit Status:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('visitStatus', filters.visitStatus)}</span>
            </div>
          )}

          {shouldBeFullWidth(filters.bilType) && (
            <div className="pdf-summary-item pdf-summary-item-full">
              <span className="pdf-summary-label">Bil Type:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('bilType', filters.bilType)}</span>
            </div>
          )}

          {shouldBeFullWidth(filters.itemCategory) && (
            <div className="pdf-summary-item pdf-summary-item-full">
              <span className="pdf-summary-label">Item Category:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('itemCategory', filters.itemCategory)}</span>
            </div>
          )}

          {shouldBeFullWidth(filters.itemNumber) && (
            <div className="pdf-summary-item pdf-summary-item-full">
              <span className="pdf-summary-label">Item Number:</span>
              <span className="pdf-summary-value">{getFilterDisplayValue('itemNumber', filters.itemNumber)}</span>
            </div>
          )}
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
                {filterOptions.dateOfService.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="date-range-row">
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


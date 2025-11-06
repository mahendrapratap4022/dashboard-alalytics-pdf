# Analytics Dashboard

A modern, responsive React.js single-page application dashboard with analytics, charts, and PDF export functionality.

## Features

- **Responsive Dashboard Layout** - Left sidebar navigation with collapsible menu
- **Analytics Dashboard** - Comprehensive analytics page with multiple sections
- **Advanced Filters** - Multiple filter options including date pickers and dropdowns
- **Data Visualization** - Interactive charts using AG Charts library
- **PDF Export** - Export dashboard data to PDF with one click
- **Beautiful UI** - Modern design with gradient backgrounds and smooth animations

## Dashboard Sections

1. **Header Section**
   - Title: "Analytics"
   - Last updated timestamp
   - Export to PDF button

2. **Filter Section**
   - Date of Service picker
   - Stock Location, Provider, HCPCS, Fitter, Visit Status selects
   - From/To date range pickers
   - Item Category, Bil Type, Item Number selects
   - Reset to Default and Apply buttons

3. **Key Metrics Section**
   - Large Revenue Card (light blue) - Shows formula: Total Est. Allowed - Total COGS = Est. Revenue
   - Medium Cards Grid (light yellow) - 4x3 grid with various metrics (shown in two rows)
   - Side Cards (light purple) - Additional metrics with trend indicators

4. **Line Chart Section**
   - Multi-line chart showing Total Units, Total Charged & Total Allowed over time
   - Interactive legend and tooltips
   - Using AG Charts library

5. **Horizontal Bar Chart Section**
   - Tabbed interface (Stock Location | Provider | HCPCS | Fitters)
   - Dropdown filters for each tab
   - Toggle between Est. Revenue (dollars) and Qty Total (numbers)
   - Interactive bar charts

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation

1. Navigate to the project directory:
```bash
cd dashboard
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm run dev
```

The application will open automatically in your browser at `http://localhost:3000`

## Building for Production

Create an optimized production build:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Technologies Used

- **React 18** - Frontend framework
- **React Router DOM** - Client-side routing
- **AG Charts** - Advanced charting library
- **Vite** - Build tool and development server
- **html2canvas** - HTML to canvas conversion for PDF
- **jsPDF** - PDF generation library

## Project Structure

```
dashboard/
├── src/
│   ├── components/
│   │   ├── Layout/
│   │   │   ├── Layout.jsx
│   │   │   └── Layout.css
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.jsx
│   │   │   └── Sidebar.css
│   │   └── Dashboard/
│   │       ├── FilterSection.jsx
│   │       ├── FilterSection.css
│   │       ├── DataCards.jsx
│   │       ├── DataCards.css
│   │       ├── LineChartSection.jsx
│   │       ├── LineChartSection.css
│   │       ├── HorizontalChartSection.jsx
│   │       └── HorizontalChartSection.css
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   └── Dashboard.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

## Features Detail

### PDF Export
The PDF export functionality captures all sections except the filter section and generates a downloadable PDF file. The export maintains the visual styling and layout of the dashboard.

### Responsive Design
The dashboard is fully responsive and adapts to different screen sizes. The sidebar can be toggled on smaller screens for better mobile experience.

### Data Filtering
All filter dropdowns are functional and ready to be connected to your backend API. Currently showing "All" as the default option for each filter.

## Customization

### Adding New Data
Update the dummy data in the respective component files:
- `DataCards.jsx` - Update metric values
- `LineChartSection.jsx` - Update chart data
- `HorizontalChartSection.jsx` - Update chart data for different tabs

### Styling
Each component has its own CSS file for easy customization. The color scheme uses:
- Light Blue (#e3f2fd) - Revenue card
- Light Yellow (#fff9c4) - Metric cards
- Light Purple (#f3e5f5) - Side cards

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is proprietary and confidential.


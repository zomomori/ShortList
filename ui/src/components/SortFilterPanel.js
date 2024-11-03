// SortFilterPanel.js
import React from 'react';

const SortFilterPanel = ({ onSort, onFilter }) => (
  <div className="sort-filter-panel">
    <button onClick={() => onSort('name')}>Sort by Name</button>
    <button onClick={() => onSort('date')}>Sort by Date</button>
    <button onClick={() => onFilter('experience')}>Filter by Experience</button>
    {/* Add more buttons as needed */}
  </div>
);

export default SortFilterPanel;

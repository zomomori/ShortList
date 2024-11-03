// SortFilterPanel.js
import React, { useState, useEffect } from 'react';

const SortFilterPanel = ({ selectedJob, profiles, onFilter, onSort }) => {
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [keywords, setKeywords] = useState([]);

  useEffect(() => {
    if (selectedJob) {
      setKeywords(selectedJob.keywords || []); // Assume keywords are in the job object
      setSelectedKeyword(''); // Reset selected keyword when job changes
    }
  }, [selectedJob]);

  const handleFilter = () => {
    if (selectedKeyword) {
      onFilter(selectedKeyword);
    }
  };

  return (
    <div className="sort-filter-panel">
      <h3>Filter by Keywords</h3>
      <select value={selectedKeyword} onChange={(e) => setSelectedKeyword(e.target.value)}>
        <option value="">Select Keyword</option>
        {keywords.length > 0 ? (
          keywords.map((keyword, index) => (
            <option key={index} value={keyword}>{keyword}</option>
          ))
        ) : (
          <option value="" disabled>No Keywords Available</option>
        )}
      </select>
      <button onClick={handleFilter}>Filter</button>
      <h3>Sort Options</h3>
      <button onClick={() => onSort('name')}>Sort by Name (Placeholder)</button>
      <button onClick={() => onSort('date')}>Sort by Date (Placeholder)</button>
    </div>
  );
};

export default SortFilterPanel;

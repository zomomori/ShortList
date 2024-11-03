import React, { useState, useEffect } from 'react';

const SortFilterPanel = ({ selectedJob, profiles, onFilter, onSort }) => {
  const [selectedKeyword, setSelectedKeyword] = useState('');
  const [sortedKeywords, setSortedKeywords] = useState([]);

  useEffect(() => {
    if (selectedJob) {
      const allKeywords = selectedJob.keywords?.all || [];
      const importantKeywords = selectedJob.keywords?.important || [];

      // Sort keywords to put important ones at the top
      const sorted = [
        ...importantKeywords, // Add all important keywords first
        ...allKeywords.filter(keyword => !importantKeywords.includes(keyword)) // Then add non-important ones
      ];

      setSortedKeywords(sorted);
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
        {sortedKeywords.length > 0 ? (
          sortedKeywords.map((keyword, index) => (
            <option key={index} value={keyword}>
              {keyword} {selectedJob.keywords?.important?.includes(keyword) ? '⭐' : ''}
            </option>
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

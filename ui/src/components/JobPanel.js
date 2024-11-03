// JobPanel.js
import React, { useState } from 'react';
import AddJobPopup from './AddJobPopup';

const JobPanel = ({ jobs, onJobSelect, onAddJob }) => {
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleJobClick = (job) => {
    setSelectedJobId(job.id);
    onJobSelect(job); // Pass the whole job object
  };

  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);


  return (
    <div className="job-panel">
      <div className="add-job" onClick={openPopup}>
        <span className="add-icon">+</span> Add Job Listing
      </div>
      {jobs.map((job) => (
        <div 
          key={job.id} 
          onClick={() => handleJobClick(job)} // Pass the job object
          className={`job-item ${selectedJobId === job.id ? 'selected' : ''}`}
        >
          <div className="job-title">{job.title}</div>
          <div className="view-candidates">
            <span>View Candidates</span> <span className="arrow">→</span>
          </div>
        </div>
      ))}
      {isPopupOpen && (
        <AddJobPopup onClose={closePopup} onAddJob={onAddJob} />
      )}
    </div>
  );
};

export default JobPanel;

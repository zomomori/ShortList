// JobPanel.js
import React, { useState } from 'react';
import AddJobPopup from './AddJobPopup';

const JobPanel = ({ jobs, onJobSelect, onAddJob }) => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleJobClick = (jobId) => {
    setSelectedJob(jobId);
    onJobSelect(jobId);
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  return (
    <div className="job-panel">
      <div className="add-job" onClick={togglePopup}>
        <span className="add-icon">+</span> Add Job Listing
      </div>
      {jobs.map((job) => (
        <div 
          key={job.id} 
          onClick={() => handleJobClick(job.id)} 
          className={`job-item ${selectedJob === job.id ? 'selected' : ''}`}
        >
          <div className="job-title">{job.title}</div>
          <div className="view-candidates">
            <span>View Candidates</span> <span className="arrow">→</span>
          </div>
        </div>
      ))}
      {isPopupOpen && (
        <AddJobPopup onClose={togglePopup} onAddJob={onAddJob} />
      )}
    </div>
  );
};

export default JobPanel;

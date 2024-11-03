// AddJobPopup.js
import React, { useState } from 'react';

const AddJobPopup = ({ onClose, onAddJob }) => {
  const [jobTitle, setJobTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobTitle) {
      onAddJob({ id: Date.now(), title: jobTitle }); // Generate a unique ID and add job
      onClose(); // Close the popup
      setJobTitle(''); // Clear input
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup">
        <h2>Add Job Listing</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Job Title:  
            <input 
              type="text" 
              value={jobTitle} 
              onChange={(e) => setJobTitle(e.target.value)} 
              required 
            />
          </label>
          <button type="submit">Add Job</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default AddJobPopup;

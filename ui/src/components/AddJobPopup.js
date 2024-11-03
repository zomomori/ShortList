// AddJobPopup.js
import React, { useState } from 'react';
import { getJobDescKeywords, getResumeSummary } from './backend/backendAPI';

const AddJobPopup = ({ onClose, onAddJob }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [keywords, setKeywords] = useState([]); // Keywords now contain an object for importance
  const [newKeyword, setNewKeyword] = useState('');
  const [isAdvancedOptionsVisible, setIsAdvancedOptionsVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (jobTitle && jobDescription) {
      if (!isAdvancedOptionsVisible) {
        getJobDescKeywords(jobTitle + ' \n' + jobDescription)
          .then(rr => {
            const parsedKeywords = [...new Set(rr.split(',').map(keyword => keyword.trim()))].map(keyword => ({
                text: keyword,
                important: false 
            }));          
            setKeywords(parsedKeywords);
            setIsAdvancedOptionsVisible(true);
        })
      } else {
        onAddJob({ id: Date.now(), title: jobTitle, description: jobDescription });
        console.log('Adding job:', { title: jobTitle, description: jobDescription, keywords });
        onClose();
        setJobTitle('');
        setJobDescription('');
        setIsAdvancedOptionsVisible(false);
      }
    }
  };

  const handleAddKeyword = () => {
    if (newKeyword) {
      setKeywords((prevKeywords) => [...prevKeywords, { text: newKeyword, important: false }]);
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setKeywords((prevKeywords) => prevKeywords.filter(keyword => keyword.text !== keywordToRemove));
  };

  const toggleImportant = (keywordText) => {
    setKeywords((prevKeywords) => {
      const updatedKeywords = prevKeywords.map((keyword) => {
        if (keyword.text === keywordText) {
          return { ...keyword, important: !keyword.important };
        }
        return keyword;
      });
      // Sort keywords, moving important ones to the top
      return updatedKeywords.sort((a, b) => b.important - a.important);
    });
  };

  return (
    <div className="popup-overlay">
      <div className="popup large-popup">
        <h2>Add Job Listing</h2>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            value={jobTitle} 
            onChange={(e) => setJobTitle(e.target.value)} 
            placeholder="Job Title" 
            required 
          />
          <textarea 
            value={jobDescription} 
            onChange={(e) => setJobDescription(e.target.value)} 
            placeholder="Job Description" 
            required 
            rows="4"
          />
          <button type="submit">Add Job</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>

        {/* Advanced Options - Keyword Management */}
        {isAdvancedOptionsVisible && (
          <div className="advanced-options">
            <h3>Advanced Options</h3>
            <p>Add new keyword:</p>
            <div className="keyword-input">
              <input 
                type="text" 
                value={newKeyword} 
                onChange={(e) => setNewKeyword(e.target.value)} 
                placeholder="New Keyword" 
              />
              <button onClick={handleAddKeyword}>Add</button>
            </div>
            <p>Manage generated keywords:</p>
            <div className="keyword-list">
              {keywords.map((keyword, index) => (
                <div key={index} className="keyword-item">
                  <span 
                    className={`star-icon ${keyword.important ? 'filled' : ''}`} 
                    onClick={() => toggleImportant(keyword.text)}
                  >
                    {keyword.important ? '★' : '☆'} {/* Filled star if important */}
                  </span>
                  <span>{keyword.text}</span>
                  <button className="remove-keyword" onClick={() => handleRemoveKeyword(keyword.text)}>×</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddJobPopup;

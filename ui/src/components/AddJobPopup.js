import React, { useState } from 'react';

const AddJobPopup = ({ onClose, onAddJob }) => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [keywords, setKeywords] = useState({
    all: ["React", "Node.js", "JavaScript"],
    important: []
  });
  const [newKeyword, setNewKeyword] = useState('');
  const [isAdvancedOptionsVisible, setIsAdvancedOptionsVisible] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (jobTitle && jobDescription) {
      setIsAdvancedOptionsVisible(true);
    }
  };
  
  const handleFinalSubmit = (e) => {
    e.preventDefault();
    onAddJob({ 
      id: Date.now(), 
      title: jobTitle, 
      description: jobDescription, 
      keywords 
    });
    onClose();
    // Reset form fields
    setJobTitle('');
    setJobDescription('');
    setKeywords({
      all: ["React", "Node.js", "JavaScript"],
      important: []
    });
    setIsAdvancedOptionsVisible(false);
  };

  const handleAddKeyword = () => {
    if (newKeyword) {
      setKeywords((prevKeywords) => ({
        ...prevKeywords,
        all: [...prevKeywords.all, newKeyword]
      }));
      setNewKeyword('');
    }
  };

  const handleRemoveKeyword = (keywordToRemove) => {
    setKeywords((prevKeywords) => ({
      all: prevKeywords.all.filter(keyword => keyword !== keywordToRemove),
      important: prevKeywords.important.filter(keyword => keyword !== keywordToRemove)
    }));
  };

  const toggleImportant = (keywordText) => {
    setKeywords((prevKeywords) => {
      const isImportant = prevKeywords.important.includes(keywordText);
      const updatedImportant = isImportant
        ? prevKeywords.important.filter(keyword => keyword !== keywordText)
        : [...prevKeywords.important, keywordText];
      
      return {
        ...prevKeywords,
        important: updatedImportant
      };
    });
  };

  return (
    <div className="popup-overlay">
      <div className="popup large-popup">
        <h2>Add Job Listing</h2>
        <form onSubmit={isAdvancedOptionsVisible ? handleFinalSubmit : handleSubmit}>
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

          {!isAdvancedOptionsVisible ? (
            <button type="submit">Show Advanced Options</button>
          ) : (
            <button type="submit">Add Job</button>
          )}

          <button type="button" onClick={onClose}>Cancel</button>
        </form>

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
              {keywords.all.map((keyword) => (
                <div key={keyword} className="keyword-item">
                  <span 
                    className={`star-icon ${keywords.important.includes(keyword) ? 'filled' : ''}`} 
                    onClick={() => toggleImportant(keyword)}
                  >
                    {keywords.important.includes(keyword) ? '★' : '☆'}
                  </span>
                  <span>{keyword}</span>
                  <button className="remove-keyword" onClick={() => handleRemoveKeyword(keyword)}>×</button>
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

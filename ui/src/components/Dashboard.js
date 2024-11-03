import React, { useState, useEffect } from 'react';
import JobPanel from './JobPanel';
import ProfileListView from './ProfileListView';
import ProfileCardView from './ProfileCardView';
import ProfileDetail from './ProfileDetails';
import SortFilterPanel from './SortFilterPanel';
import AddJobPopup from './AddJobPopup';
import jobsData from '../data/jobs.json'; // Ensure this path is correct
import profilesData from '../data/profiles.json'; // Ensure this path is correct

const Dashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    setJobList(jobsData);
    setProfiles(profilesData);
  }, []);

  const filteredProfiles = selectedJob 
    ? profiles.filter((profile) => profile.jobId === selectedJob.id) 
    : profiles; // Only filter when a job is selected

  const handleToggleView = () => {
    setViewMode((prevMode) => (prevMode === 'list' ? 'card' : 'list'));
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleAddJob = (newJob) => {
    setJobList((prevJobs) => [...prevJobs, newJob]);
  };

  const handleFilter = (keyword) => {
    console.log('Filtering profiles by keyword:', keyword);
  };

  const handleSort = (criteria) => {
    console.log('Sorting by:', criteria);
  };

  return (
    <div className="dashboard">
      <JobPanel jobs={jobList} onJobSelect={setSelectedJob} onAddJob={togglePopup} />
      <div className={`main-content ${isPopupOpen ? 'blur' : ''}`}>
        <SortFilterPanel 
          selectedJob={selectedJob} 
          profiles={profiles} 
          onFilter={handleFilter} 
          onSort={handleSort} 
        />
        <div className="view-toggle">
          <button onClick={handleToggleView} className="toggle-button">
            Switch to {viewMode === 'list' ? 'Card View' : 'List View'}
          </button>
        </div>
        {selectedJob ? (
          selectedProfile ? (
            <ProfileDetail profile={selectedProfile} />
          ) : (
            viewMode === 'list' ? (
              <ProfileListView profiles={filteredProfiles} onViewProfile={setSelectedProfile} />
            ) : (
              <ProfileCardView profiles={filteredProfiles} onViewProfile={setSelectedProfile} />
            )
          )
        ) : (
          <div className="no-job-selected">
            <h2>Select a job to view candidates.</h2>
          </div>
        )}
      </div>
      {isPopupOpen && (
        <AddJobPopup onClose={togglePopup} onAddJob={handleAddJob} />
      )}
    </div>
  );
};

export default Dashboard;

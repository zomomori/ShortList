import React, { useState, useEffect } from 'react';
import JobPanel from './JobPanel';
import ProfileListView from './ProfileListView';
import ProfileCardView from './ProfileCardView';
import ProfileDetail from './ProfileDetails';
import SortFilterPanel from './SortFilterPanel';
import AddJobPopup from './AddJobPopup';
import jobsData from '../data/jobs.json'; // Adjust path accordingly
import profilesData from '../data/profiles.json'; // Adjust path accordingly

const Dashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Load jobs and profiles from JSON
    setJobList(jobsData);
    setProfiles(profilesData);
  }, []);

  const filteredProfiles = profiles.filter((profile) => profile.jobId === selectedJob);

  const handleToggleView = () => {
    setViewMode((prevMode) => (prevMode === 'list' ? 'card' : 'list'));
  };

  const togglePopup = () => {
    setIsPopupOpen((prev) => !prev);
  };

  const handleAddJob = (newJob) => {
    setJobList((prevJobs) => [...prevJobs, newJob]);
  };

  return (
    <div className="dashboard">
      <JobPanel jobs={jobList} onJobSelect={setSelectedJob} onAddJob={handleAddJob} />
      <div className={`main-content ${isPopupOpen ? 'blur' : ''}`}>
        <SortFilterPanel onSort={() => {}} onFilter={() => {}} />
        <div className="view-toggle">
          <button onClick={handleToggleView} className="toggle-button">
            Switch to {viewMode === 'list' ? 'Card View' : 'List View'}
          </button>
        </div>
        {selectedProfile ? (
          <ProfileDetail profile={selectedProfile} />
        ) : (
          viewMode === 'list' ? (
            <ProfileListView profiles={filteredProfiles} onViewProfile={setSelectedProfile} />
          ) : (
            <ProfileCardView profiles={filteredProfiles} onViewProfile={setSelectedProfile} />
          )
        )}
      </div>
      {isPopupOpen && (
        <AddJobPopup onClose={togglePopup} onAddJob={handleAddJob} />
      )}
    </div>
  );
};

export default Dashboard;

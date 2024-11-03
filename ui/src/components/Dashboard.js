import React, { useState, useEffect } from 'react';
import JobPanel from './JobPanel';
import ProfileListView from './ProfileListView';
import ProfileCardView from './ProfileCardView';
import ProfileDetail from './ProfileDetails';
import SortFilterPanel from './SortFilterPanel';
import AddJobPopup from './AddJobPopup';
import jobsData from '../data/jobs.json'; // Ensure this path is correct
import profilesData from '../data/profiles.json'; // Ensure this path is correct
import { getResumeSummary } from './backend/backendAPI';

const Dashboard = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [jobList, setJobList] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const initializeData = async () => {
      setJobList(jobsData);
      const updatedProfiles = await updateProfilesWithSummaries(profilesData);
      setProfiles(updatedProfiles);
    };

    initializeData();
  }, []);

  const updateProfilesWithSummaries = async (profiles) => {
    const updatedProfiles = await Promise.all(
      profiles.map(async (profile) => {
        if (!profile.summary) {
          const resumePath = "C:/Users/momo/Documents/GitHub/ShortList/ui/src/data/resume/Resume_" + profile.id + ".pdf";
          alert(`Fetching summary for: ${resumePath}`); // More context for debugging
          
          let summary;
          try {
            summary = await getResumeSummary(resumePath);
            console.log('Fetched summary:', summary); // Log fetched summary
          } catch (error) {
            console.error('Error fetching summary:', error); // Log error if it occurs
            summary = 'Invalid.';
          } finally {
            return { ...profile, summary };
          }
        }
        return profile; 
      })
    );
  
    // Log updated profiles before sending to server
    console.log('Updated profiles:', updatedProfiles);
  
    await updateProfilesJson(updatedProfiles);
    return updatedProfiles;
  };  

  const updateProfilesJson = async (profiles) => {
    // Example API call to update the profiles JSON file
    await fetch('http://localhost:3001/update-profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profiles),
    });
  };

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
    console.log('Adding new job:', newJob);
    // api call here to update json
  };

  const handleFilter = (keyword) => {
    console.log('Filtering profiles by keyword:', keyword);
    // add api call for filtering here
  };

  const handleSort = (criteria) => {
    console.log('Sorting by:', criteria);
    // add api call for sorting here
  };

  return (
    <div className="dashboard">
      <JobPanel jobs={jobList} onJobSelect={setSelectedJob} onAddJob={handleAddJob} />
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

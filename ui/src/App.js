// App.js
import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    // Fetch jobs data
    fetch('/jobs.json')
      .then(response => response.json())
      .then(data => setJobs(data))
      .catch(error => console.error('Error loading jobs:', error));

    // Fetch profiles data
    fetch('/profiles.json')
      .then(response => response.json())
      .then(data => setProfiles(data))
      .catch(error => console.error('Error loading profiles:', error));
  }, []);

  return (
    <div className="App">
      <Dashboard jobs={jobs} profiles={profiles} />
    </div>
  );
};

export default App;

// ProfileListView.js
import React from 'react';

const ProfileListView = ({ profiles, onViewProfile }) => (
  <div className="profile-list-view">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Resume</th>
          <th>Summary</th>
        </tr>
      </thead>
      <tbody>
        {profiles.map((profile) => (
          <tr key={profile.id} onClick={() => onViewProfile(profile.id)}>
            <td>{profile.name}</td>
            <td className="resume-cell">
              <a href={profile.resumeUrl} target="_blank" rel="noopener noreferrer">
                <i className="fas fa-file-alt resume-icon" aria-hidden="true"></i>
              </a>
            </td>
            <td className="summary-cell">{profile.summary}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default ProfileListView;

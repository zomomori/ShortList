// ProfileCardView.js
import React from 'react';

const ProfileCardView = ({ profiles, onViewProfile }) => (
  <div className="profile-card-view">
    {profiles.map((profile) => (
      <div key={profile.id} className="profile-card" onClick={() => onViewProfile(profile.id)}>
        <h3>{profile.name}</h3>
        <p>{profile.summary}</p>
        <button>View More</button>
      </div>
    ))}
  </div>
);

export default ProfileCardView;

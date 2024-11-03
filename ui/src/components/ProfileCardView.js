import React, { useState } from 'react';

const ProfileCardView = ({ profiles, onViewProfile }) => {
  const [flippedCards, setFlippedCards] = useState({});

  const handleFlip = (id) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="profile-card-view">
      {profiles.map((profile) => (
        <div 
          key={profile.id} 
          className={`profile-card ${flippedCards[profile.id] ? 'flipped' : ''}`} 
          onClick={() => handleFlip(profile.id)}
        >
          <div className="card-inner">
            <div className="card-front">
              <h3>{profile.name}</h3>
              <p>{profile.summary}</p>
            </div>
            <div className="card-back">
              <p>{profile.details}</p>
              <button onClick={() => onViewProfile(profile.id)}>View More</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileCardView;

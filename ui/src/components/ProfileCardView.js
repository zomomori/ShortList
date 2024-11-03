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
              <div className="pastel-block">
                <h3>{profile.name}</h3>
                <p>{profile.details}</p>
              </div>
              <div className="tags">
                {profile.keywords.slice(0, 5).map((keyword, index) => (
                  <span key={index} className="tag">
                    <i className="tag-icon">🏷️</i> {keyword}
                  </span>
                ))}
              </div>
            </div>
            <div className="card-back">
              <div className="full-span-pastel">
                <p>{profile.summary}</p>
                <button onClick={() => onViewProfile(profile.id)}>View More</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfileCardView;

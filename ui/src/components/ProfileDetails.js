// ProfileDetail.js
import React from 'react';

const ProfileDetail = ({ profile }) => (
  <div className="profile-detail">
    <h2>{profile.name}</h2>
    <p>{profile.details}</p>
  </div>
);

export default ProfileDetail;

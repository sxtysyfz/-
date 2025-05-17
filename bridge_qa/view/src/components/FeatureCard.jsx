import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FeatureCard.css';

const FeatureCard = ({ title, description, link, svg, isChinese }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(link);
    };

  return (
    <div className="feature-card">
      <div className="feature-image">
        {svg}
      </div>
      <div className="feature-content">
        <h3>{isChinese ? title.zh : title.en}</h3>
        <p>{isChinese ? description.zh : description.en}</p>
        <button className="cta-button" onClick={handleCardClick}>
          {isChinese ? '开始' : 'Start Conversation'}
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/></svg>
        </button>
      </div>
    </div>
  );
};

export default FeatureCard;

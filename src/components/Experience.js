import React from 'react';

const Experience = ({
  title,
  company,
  dates,
  location,
  description,
  imageUrl,
}) => {
  return (
    <div className="d-flex flex-row mb-2">
      <img
        alt="company"
        src={imageUrl}
        height="50"
        width="50"
        className="mr-3"
      />
      <div className="border-bottom flex-grow-1 pb-2">
        <h5 className="mb-0">{title}</h5>
        <div>{company}</div>
        <div className="d-flex flex-column mb-2">
          <small className="text-secondary mb-0">{dates}</small>
          <small className="text-secondary mb-0">{location}</small>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Experience;

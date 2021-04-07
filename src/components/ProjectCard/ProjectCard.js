import React from 'react';

const ProjectCard = (props) => {
  const { step, item } = props;
  const { location, users, logs, iconType } = item;
  return (
    <div className="dashboard__item" key={`${step}Project`}>
      <div className="dashboard__item-wrapper">
        <div className="dashboard__calling">
          <i className={iconType} />
          <span>
            Project Name 00
            {step}
          </span>
          <a href="https://explorer.testnet.near.org/transactions/iyCR99eKoMnaRwczyn5v7TWEEwXKA3DBDYkiaA4AgGL" target="_blank" rel="noreferrer">
            NFT
          </a>
        </div>

        <div className="dashboard__info">
          <div className="dashboard__location">
            <i className="icon-marker" />
            <span>{location}</span>
          </div>
          <div className="dashboard__users">
            <i className="icon-account" />
            <span>{users}</span>
          </div>
          <div className="dashboard__log">
            <i className="icon-clock" />
            <span>{logs}</span>
          </div>
          <div className="dashboard__setting">
            <div className="dashboard__point" />
            <div className="dashboard__point" />
            <div className="dashboard__point" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

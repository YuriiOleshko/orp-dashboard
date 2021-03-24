import React, { useContext, memo } from 'react';
import { ReactSVG } from 'react-svg';
import { Link } from 'react-router-dom';
import { useIntl } from 'react-intl';
import logo from '../../../assets/image/ORPLogo.svg';
import { setting } from '../LangLayot';
import { appStore } from '../../../state/app';

const Header = ({ headerLinks, classStyle }) => {
  const intl = useIntl();
  const customClass = `header ${classStyle}`;

  const { state } = useContext(appStore);
  const { app } = state;
  const { profile } = app;

  const getUserName = () => `${profile?.firstName} ${profile?.lastName}`;

  return (
    <header className={customClass}>
      <div className="header__wrapper">
        <div className="header__logo">
          <ReactSVG src={logo} />
        </div>
        <div className="header__nav">
          {headerLinks.map((item) => <Link key={item.label} className="header__item" to={item.href}>{intl.formatMessage(item.label)}</Link>)}
        </div>
        <div className="header__setting">
          <span>
            { profile ? getUserName() : intl.formatMessage(setting) }
          </span>
          <i className="icon-setting" />
        </div>
      </div>

    </header>
  );
};

export default memo(Header);
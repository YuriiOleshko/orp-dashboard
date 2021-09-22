import React from 'react';
import {
  NavLink, Link, useHistory,
} from 'react-router-dom';
import { FormattedDate, useIntl } from 'react-intl';
import CustomBtn from 'src/generic/CustomBtn';
import { copyRight } from 'src/page/Login/LangLogin';
import {
  item1, item2, item3, item4, item5, item6, btnLabel,
} from './LangMenu';

const Menu = () => {
  const intl = useIntl();
  const history = useHistory();
  return (
    <div className="menu">
      <div className="menu__wrapper">
        <div className="menu__nav">
          <div className="menu__wrapper-btn">
            <CustomBtn label={intl.formatMessage(btnLabel)} customClass="btn__launch" iconClass="icon-tree" handleClick={() => { history.push('/create-project'); }} />
          </div>
          <div className="menu__list">
            <NavLink activeClassName="active" className="menu__item" exact to="/">
              <i className="icon-charning" />
              {intl.formatMessage(item1)}
            </NavLink>
            <Link className="menu__item" to="#">
              <i className="icon-shield" />
              {intl.formatMessage(item2)}
            </Link>
            <Link className="menu__item" to="#">
              <i className="icon-shield-gal" />
              {intl.formatMessage(item3)}
            </Link>
            <Link className="menu__item" to="#">
              <i className="icon-schems" />
              {intl.formatMessage(item4)}
            </Link>
            <Link className="menu__item" to="#">
              <i className="icon-vilka" />
              {intl.formatMessage(item5)}
            </Link>
            <NavLink activeClassName="active" className="menu__item" to="/field-agents">
              <i className="icon-people" />
              {intl.formatMessage(item6)}
            </NavLink>
          </div>
        </div>
        <p className="menu__copy">
          {intl.formatMessage(copyRight)}
          <FormattedDate
            value={Date.now()}
            year="numeric"
          />
        </p>
      </div>
    </div>
  );
};

export default Menu;

import React from 'react';
import { ReactSVG } from 'react-svg';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router';
import CustomBtn from 'src/generic/CustomBtn';
import logo from 'src/assets/image/launch/min-logo.svg';
import {
  title, desc, btnLabel,
} from './LangLaunchCreate';

const LaunchCreate = () => {
  const intl = useIntl();
  const history = useHistory();
  return (
    <section className="launch">
      <div className="launch__cart">
        <div className="launch__img">
          <ReactSVG src={logo} />
        </div>
        <div className="launch__desc">
          <h2 className="launch__title">{intl.formatMessage(title)}</h2>
          <p>{intl.formatMessage(desc)}</p>
          <div className="launch__wrapper-btn">
            <CustomBtn
              label={intl.formatMessage(btnLabel)}
              customClass="btn__launch"
              handleClick={() => {
                history.push('/create-project');
              }}
              iconClass="icon-tree"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default LaunchCreate;

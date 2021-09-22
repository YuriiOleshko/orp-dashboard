import React from 'react';
import { FormattedDate, useIntl } from 'react-intl';
// eslint-disable-next-line import/no-unresolved
import { copyRight } from 'src/page/Login/LangLogin';

const Footer = () => {
  const intl = useIntl();

  return (
    <footer className="footer">
      <p className="footer__copy">
        {intl.formatMessage(copyRight)}
        {' '}
        <FormattedDate
          value={Date.now()}
          year="numeric"
        />
      </p>
    </footer>
  );
};

export default Footer;

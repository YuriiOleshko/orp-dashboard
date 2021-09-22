import React from 'react';
import { ReactSVG } from 'react-svg';
import logo from 'src/assets/image/login/big-logo.svg';
import trees from 'src/assets/image/login/trees.svg';

const IntroPage = () => (
  <div className="login__intro">
    <div className="login__logo">
      <ReactSVG src={logo} />
    </div>
    <div className="login__trees">
      <ReactSVG src={trees} />
    </div>
  </div>
);

export default IntroPage;

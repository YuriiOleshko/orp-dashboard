import React from 'react';
import Header from '../Layout/Header';
import Menu from './Menu';
import {
  item1, item2, item3, item4,
} from './LangLayotDash';

const headerLinks = [{ label: item1, href: '/' }, { label: item2, href: '/' }, { label: item3, href: '/' }, { label: item4, href: '/' }];
const LayoutDash = (props) => {
  const { children } = props;

  return (
    <div className="layout__dash">
      <Header headerLinks={headerLinks} classStyle="dash" />
      <Menu />
      <main className="page">
        <section className="dashboard">
          <div className="dashboard__wrapper">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
};

export default LayoutDash;

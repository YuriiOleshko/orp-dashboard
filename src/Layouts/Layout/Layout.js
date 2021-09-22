import React from 'react';
import Header from './Header';
import Footer from './Footer';
import {
  item1, item2, item3, item4,
} from './LangLayot';

const headerLinks = [{ label: item1, href: '/' }, { label: item2, href: '/' }, { label: item3, href: '/' }, { label: item4, href: '/' }];
const Layout = (props) => {
  const { children } = props;

  return (
    <div className="layout">
      <Header headerLinks={headerLinks} />
      <main className="page">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;

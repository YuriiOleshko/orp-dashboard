import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { item1 } from './LangLayot';

const headerLinks = [{ label: item1, href: '/' }];
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

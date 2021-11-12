import React from 'react';
import {
  Route, Router, useHistory,
} from 'react-router';
import LayoutDash from '../../Layouts/LayoutDash/LayoutDash';
import ExistingProject from '../ExistingProject';

const Dashboard = () => {
  const history = useHistory();

  return (
    <LayoutDash>
      <section className="dashboard">
        <div className="dashboard__wrapper">
          <Router history={history}>
            <Route exact path="/" component={() => <ExistingProject />} />
          </Router>
        </div>
      </section>
    </LayoutDash>
  );
};

export default Dashboard;

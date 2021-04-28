import React from 'react';
import {
  Route, Router, useHistory,
} from 'react-router';
import LayoutDash from '../../components/LayoutDash/LayoutDash';
import CollateralStatus from '../CollateralStatus';
import ExistingProject from '../ExistingProject';

const Dashboard = () => {
  const history = useHistory();

  return (
    <LayoutDash>
      <section className="dashboard">
        <div className="dashboard__wrapper">
          <Router history={history}>
            <Route exact path="/" component={() => <ExistingProject />} />
            {/* <Route exact path="/collaterial" component={() => <CollateralStatus />} /> */}
          </Router>
        </div>
      </section>
    </LayoutDash>
  );
};

export default Dashboard;

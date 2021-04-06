import React from 'react';
import { Route, Switch } from 'react-router-dom';
import RouteWithSubRoutes from '../RouterWithSubRoutes';
import ScrollToTop from '../ScrollTop';

const RenderRoutes = (props) => {
  const { routes } = props;

  return (
    <>
      <Switch>
        {routes.map((route) => {
          const { key } = route;
          return <RouteWithSubRoutes key={key} {...route} />;
        })}
        <Route component={() => <h1>Not Found!</h1>} />
      </Switch>
      <ScrollToTop />
    </>
  );
};

export default RenderRoutes;

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  App,
  CounterApp,
} from 'containers';
import {
  NotFound,
  AboutView,
} from 'components';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={CounterApp} />
    <Route path="about" component={AboutView} />
    <Route path="*" component={NotFound} status={404} />
  </Route>
);

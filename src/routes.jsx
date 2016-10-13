import React from 'react';
import { Route, IndexRoute } from 'react-router';
import {
  App,
  NotFound,
  CounterView,
  AboutView,
} from 'views';


export default (
  <Route path="/" component={App}>
    <IndexRoute component={CounterView} />
    <Route path="about" component={AboutView} />
    <Route path="*" component={NotFound} status={404} />
  </Route>
);

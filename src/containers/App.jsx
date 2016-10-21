import React, { PropTypes } from 'react';
import { Header } from 'components';


const App = props => (
  <div>
    <Header />
    {props.children}
  </div>
);

App.propTypes = {
  children: PropTypes.node,
};

export default App;

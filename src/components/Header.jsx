import React from 'react';
import { Link, IndexLink, browserHistory } from 'react-router';


const Header = () => (
  <div>
    <IndexLink to={'/'}>App</IndexLink><br />
    <Link to={'/about'}>About</Link><br />
    <div onClick={() => { browserHistory.push('/about'); }}>Custom Link</div>
  </div>
);

export default Header;

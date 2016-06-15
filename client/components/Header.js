import React from 'react';

import { Link } from 'react-router';

import { AppBar, Navigation, IconButton, Link as L } from 'react-toolbox';

const Header = () => {
  return (
    <AppBar fixed flat>
        <Navigation type="horizontal">
          <L active><Link to="/">Mango</Link></L>
          <L><Link to="/browse">Browse</Link></L>
        </Navigation>
    </AppBar>
  )
};

export default Header;

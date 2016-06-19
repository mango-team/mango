import React from 'react'
import { Link } from 'react-router'
import { Navigation } from 'react-toolbox'

const HomeNavigation = ({ active }) => {
  return (
    <Navigation type='horizontal'>
      <Link to='/' className={ active === 'home' ? 'active' : '' } data-react-toolbox='link'>Home</Link>
      <Link to='/feed/trending' className={ active === 'trending' ? 'active' : '' } data-react-toolbox='link'>Trending</Link>
      <Link to='/history' className={ active === 'history' ? 'active' : '' } data-react-toolbox='link'>History</Link>
    </Navigation>
  )
}

export default HomeNavigation

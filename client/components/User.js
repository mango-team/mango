import React from 'react'
import { Link } from 'react-router'
import { Navigation } from 'react-toolbox'

const User = ({ children, params, users }) => {
  const user = users.find((user) => user.username === params.username)
  return (
    <div>
      <div className='header'>
        <img src={ user.coverUrl } style={{width: '100%', height: '150px'}}/>
        <Navigation type='horizontal'>
          <Link to={`/user/${user.username}`} className='active' data-react-toolbox='link'>Home</Link>
          <Link to={`/user/${user.username}/playlists`} data-react-toolbox='link'>Playlists</Link>
          <Link to={`/user/${user.username}/subscriptions`} data-react-toolbox='link'>Subscriptions</Link>
          <Link to={`/user/${user.username}/discussion`} data-react-toolbox='link'>Discussion</Link>
          <Link to={`/user/${user.username}/about`} data-react-toolbox='link'>About</Link>
        </Navigation>
        <div>
          <h3>
            <Link to={`/user/${user.username}`} data-react-toolbox='link'>
              {user.firstName} {user.lastName}
            </Link>
          </h3>
        </div>
      </div>
      { children }
    </div>
  )
}

export default User

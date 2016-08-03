import 'react-toolbox/lib/commons.scss'
import '../styles/_theme.scss'
import React from 'react'
// import Header from './Header'
import { Link } from 'react-router'
import { Layout, Panel, AppBar, Navigation, Avatar } from 'react-toolbox'
import childrenWithProps from './helpers/childrenWithProps'

const PageLayout = (props) => {
  const { app, users } = props
  let userConnected = typeof app.currentUser !== 'undefined'
  let userId
  let currentUser

  if (userConnected) {
    userId = app.currentUser.id
    currentUser = users.find((value, index) => value.id == userId)
    userConnected = typeof currentUser !== 'undefined'
  }
  return (
    <Layout>
      <Panel>
        <AppBar>
          <Link to='/'>Mango</Link>
          <Navigation type='horizontal'>
            {userConnected && <Link to={`/user/${currentUser.username}`}><Avatar title='Profile' image={currentUser.avatarUrl} /></Link>}
            {!userConnected && <Link to='signin'>Sign in</Link>}
            {!userConnected && <Link to='signup'>Sign up</Link>}
          </Navigation>
        </AppBar>
        <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
          {childrenWithProps(props, { currentUser })}
        </div>
        <footer></footer>
      </Panel>
    </Layout>
  )
}

export default PageLayout

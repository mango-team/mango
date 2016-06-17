import 'react-toolbox/lib/commons.scss';
import '../styles/_theme.scss';
import React from 'react';
//import Header from './Header';
import { Link } from 'react-router';
import { Layout, Panel, AppBar, Navigation, Avatar } from 'react-toolbox';
import childrenWithProps from './helpers/childrenWithProps';

const PageLayout = (props) => {
    let userConnected = typeof props.app.user != 'undefined';
    let userId;
    let user;

    if(userConnected) {
        userId = props.app.user.id;
        user = props.users.find((value, index) => value.id == userId);
        userConnected = typeof user != 'undefined';
    }
    
    return (
        <Layout>
            <Panel>
                <AppBar>
                    <Link to="/">Mango</Link>
                    <Navigation type="horizontal">
                        {userConnected && <Link to={`/user/${user.username}`}><Avatar title="Profile" image={user.avatarUrl} /></Link>}
                        {!userConnected && <Link to="signin">Sign in</Link>}
                        {!userConnected && <Link to="signup">Sign up</Link>}
                    </Navigation>
                </AppBar>
                <div  style={{ flex: 1, overflowY: 'auto', padding: '1.8rem' }}>
                    {childrenWithProps(props, { user })}
                </div>
                <footer></footer>
            </Panel>
        </Layout>
    );
};

export default PageLayout;
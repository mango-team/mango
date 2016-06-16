import React from 'react';
import { Link } from 'react-router';
import { Navigation } from 'react-toolbox';

const User = ({ user, children }) => {
    return (
        <div>
            { user &&
                <div className="header">
                    <img src={ user.coverUrl} style={{width: '100%', height: '150px'}}/>
                    <Navigation type="horizontal">
                        <Link to={`/user/${user.username}`} className="active">Home</Link>
                        <Link to={`/user/${user.username}/playlists`}>Playlists</Link>
                        <Link to={`/user/${user.username}/subscriptions`}>Subscriptions</Link>
                        <Link to={`/user/${user.username}/discussion`}>Discussion</Link>
                        <Link to={`/user/${user.username}/about`}>About</Link>
                    </Navigation>
                    <div>
                        <h3>
                            <Link to={`/user/${user.username}`}>
                                {user.firstName} {user.lastName} 
                            </Link>
                        </h3>
                    </div>
                </div>
            }
            { children }
        </div>
    )
};

export default User;
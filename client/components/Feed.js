import React from 'react';
import HomeNavigation from './shared/HomeNavigation';
import childrenWithProps from './helpers/childrenWithProps';

const Feed = (props) => {return (
        <div>
            <HomeNavigation />
            {childrenWithProps(props)}
        </div>
    )
};

export default Feed;
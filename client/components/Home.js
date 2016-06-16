import React from 'react';
import Connected from './home/Connected';
import Anonymous from './home/Anonymous';

const Home = (props) => {
    const { userConnected } = props;
    return (
        <div>
            {userConnected ? <Connected {...props} /> : <Anonymous {...props} />}
        </div>
    )
};

export default Home;
import React from 'react';

import Header from './Header';

const Layout = (props) => {
    return (
        <div className="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <Header />
            {React.cloneElement(props.children, props)}
        </div>
    );
};

export default Layout;
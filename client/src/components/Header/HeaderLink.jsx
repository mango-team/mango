import React from 'react';

const HeaderLink = ({children,href}) => {
    return <a href={href} className="mdl-navigation__link">{children}</a>    
}

export default HeaderLink;
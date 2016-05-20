import React from 'react';

import { Link } from 'react-router';

const HeaderLink = ({children, href}) => {
    return <a href={href} className="mdl-navigation__link">{children}</a>
};

export default HeaderLink;
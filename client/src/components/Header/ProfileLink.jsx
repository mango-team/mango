import React from 'react';

import HeaderLink from './HeaderLink';

const ProfileLink = (props) => {
  return (
    <HeaderLink>
    <button id="profileMenu" class="mdl-button mdl-js-button mdl-button--icon">
      <img width="35px" height="35px" src="http://enzosakay.com/images/Profilelogo.png" />
      Profile      
    </button>
    // I don't know why but the UI Design doesn't work here :/, that is why the whole is hidden
      <ul hidden class="mdl-menu mdl-menu--profileMenu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect" for="profileMenu">
        <li class="mdl-menu__item">Home</li>
        <li class="mdl-menu__item">Playlists</li>
        <li class="mdl-menu__item">Subscriptions</li>
        <li class="mdl-menu__item">History</li>
        <li class="mdl-menu__item">Discussions</li>
        <li class="mdl-menu__item">Settings</li>
      </ul>
    </HeaderLink>
  )
};

export default ProfileLink;

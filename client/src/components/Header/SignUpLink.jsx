import React from 'react';

import HeaderLink from './HeaderLink';
import SignUp from '../Connexion/SignUp';
import Popup from '../Shared/Popup';

const SignUpLink = (props) => {
  var popupName = "SignUp";
    var openPopup = true ? function (){
        document.getElementById('popupSignUp').style.display='block';
        document.getElementById('fadeSignUp').style.display='block';
    } : "";
  return <div id="SignUp">
          <a href="javascript:void(0)" onClick={openPopup}>  
            Sign Up          
          </a>
            <Popup name={popupName}>
              <SignUp />
            </Popup>
          </div>
};

export default SignUpLink;

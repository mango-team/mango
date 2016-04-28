import React from 'react';

import HeaderLink from './HeaderLink';
import SignIn from '../Connexion/SignIn';
import Popup from '../Shared/Popup';

const SignInLink = (props) => {   
  var popupName = "SignIn";
  var popupTitle = "Sign In"; 
    var openPopup = true ? function (){
        document.getElementById('popupSignIn').style.display='block';
        document.getElementById('fadeSignIn').style.display='block';
    } : "";
  return <div id="SignIn">
          <a href="javascript:void(0)" onClick={openPopup}>  
            {popupTitle}          
          </a>
            <Popup name={popupName} title={popupTitle}>
              <SignIn/>
            </Popup>
          </div>
};

export default SignInLink;

import React from 'react';

const SignIn = (props) => {  
    return (
        <div>   
          <p><input type="text" placeholder="Username or E-mail" size="40"/></p>
          <p><input type="password" placeholder="Password" size="40"/></p>
          <center>
            <p><input type="submit" defaultValue="Sign In" onClick={""} /></p>
            <p><a>Connect with Facebook</a></p>
            <p><a>Connect with Google</a></p>
          </center>
        </div>
    );
};
export default SignIn;
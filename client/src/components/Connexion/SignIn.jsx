import React from 'react';

const SignIn = (props) => {  
    return (
        <div>   
          <p><input type="text" placeholder="Username  or E-mail" width="300px"/></p>
          <p><input type="password" placeholder="Password" width="300px"/></p>
          <p><input type="submit" defaultValue="Sign In" onClick={""} width="300px" /></p>
          <p><a>Connect with Facebook</a></p>
          <p><a>Connect with Google</a></p>
        </div>
    );
};
export default SignIn;
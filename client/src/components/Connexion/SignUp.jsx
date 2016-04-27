import React from 'react';

const SignUp = (props) => {  
    return (
        <div>
          <p><input type="text" placeholder="Username"/></p>
          <p><input type="text" placeholder="E-mail"/></p>
          <p><input type="password" placeholder="Password"/></p>
          <p><input type="submit" defaultValue="Sign up" onClick={""} width="auto"/></p>
          <p><a>Connect with Facebook</a></p>
          <p><a>Connect with Google</a></p>
        </div>
    );
};

export default SignUp;
import React from 'react';

const SignUp = (props) => {
    return (
        <div>
            <p><input type="text" placeholder="Username" size="40"/></p>
            <p><input type="text" placeholder="E-mail" size="40"/></p>
            <p><input type="password" placeholder="Password" size="40"/></p>
            <center>
                <p><input type="submit" defaultValue="Sign up" onClick={""} width="auto"/></p>
                <p><a>Connect with Facebook</a></p>
                <p><a>Connect with Google</a></p>
            </center>
        </div>
    );
};

export default SignUp;
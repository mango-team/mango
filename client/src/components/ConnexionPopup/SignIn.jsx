import React from 'react';

export default class SignIn extends React.Component {
  constructor(props) {
        super(props);
  }
    
  render() {
    return (
        <div id="SignInPopup">              
          <span>Close<span>
          <input type="text" placeholder="Username  or E-mail"/>
          <input type="password" placeholder="Password"/>
          <input type="submit" defaultValue="Sign In" onClick={this.handleClick.bind(this)} />
          <span>Connect with Facebook<span>
          <span>Connect with Google<span>
        </div>
    );
  }
};
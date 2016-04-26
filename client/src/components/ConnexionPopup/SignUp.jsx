import React from 'react';

export default class SignUp extends React.Component {
  constructor(props) {
        super(props);
  }
    
  render() {
    return (
        <div id="SignUpPopup">
            <span>Close<span>
            <input type="text" placeholder="Username"/>
            <input type="text" placeholder="E-mail"/>
            <input type="password" placeholder="Password"/>
            <input type="submit" defaultValue="Sign up" onClick={this.handleClick.bind(this)} />
            <span>Connect with Facebook<span>
            <span>Connect with Google<span>
        </div>
    );
  }
};
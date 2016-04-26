import React from 'react';
var today = new Date();
var year = today.getFullYear();
const Footer = (props) => {
  return (
    <footer className="mdl-mega-footer">
      <div className="mdl-mega-footer__top-section">      
        <a className="mdl-mini-footer__link-list" href="/">
          <img width="35px" height="35px" src="https://cdn2.iconfinder.com/data/icons/fruit-flat-transparent/512/mango-128.png" />        
          <h5 className="mdl-logo">Mango</h5>
        </a>      
      </div>
      <div className="mdl-mega-footer__middle-section">
        <div className="mdl-mega-footer__link-list">         
          <div className="mdl-mega-footer__drop-down-section">       
           <a href="#"><h5 className="mdl-mega-footer__heading">About us</h5></a>
            <ul className="mdl-mega-footer__link-list">     
                <li><a href="#">Who are we?</a></li>
                <li><a href="#">Our moto!</a></li>
            </ul>
          </div>   
          <div className="mdl-mega-footer__drop-down-section">
            <a href="#"><h5 className="mdl-mega-footer__heading">Contact</h5></a>
            <a href="mailto:mangoprojectteam@gmail.com">Mail</a>
            <ul className="mdl-mega-footer__link-list">
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Google Plus</a></li>
            </ul>
          </div>
           <div className="mdl-mega-footer__drop-down-section">
            <a href="#"><h5 className="mdl-mega-footer__heading">Join us</h5></a>
            <ul className="mdl-mega-footer__link-list">
               <li><a href="https://github.com/mango-team/mango">Github</a></li>
               <li><a href="http://mango-team.github.io/mango/">Devblog</a></li>
            </ul>
          </div>
           <div className="mdl-mega-footer__drop-down-section">
            <a href="#"><h5 className="mdl-mega-footer__heading">Legal</h5></a>
            <ul className="mdl-mega-footer__link-list">
                <li><a href="#">Privacy policy</a></li>
                <li><a href="#">Term of use</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mdl-mega-footer__middle-section">
        <em>Site design and programming © {year} MANGO, LLC. All Rights Reserved.</em>
      </div>
    </footer>
  );
};

export default Footer;

import { Facebook, LinkedIn, Twitter, YouTube } from '@material-ui/icons';
import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='main-footer'>
        <div className='links'>
          <h4>Links</h4>
          <ul className='list'>
            <li>Home</li>
            <li>About</li>
            <li>Login</li>
            <li>SignUp</li>
            <li>Contacts</li>
          </ul>
        </div>
        <div className='info'></div>
        <div className='social-media'>
          <h4>LearnO</h4>
          <Facebook />
          <LinkedIn />
          <Twitter />
          <YouTube />
        </div>
      </div>
      <div className='copyright'>
        <h4 className='copyright-text'>
          @Copyright 2021 <em>Sandesh Parajuli</em>
        </h4>
      </div>
    </div>
  );
};

export default Footer;

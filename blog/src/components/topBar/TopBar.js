import { DehazeOutlined } from '@material-ui/icons';
import './TopBar.css';
import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TopBar = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <div className='expand'>
      <div className='nav'>
        <span>
          <button
            className='expandButton'
            onClick={(e) => {
              e.preventDefault();
              setIsExpanded(!isExpanded);
            }}
          >
            <DehazeOutlined />
          </button>
        </span>
        <span className='companyName'>LearnO</span>
      </div>
      <div className='login-register'>
        <span>
          <button
            className='btn btn-primary auth'
            onClick={(e) => {
              e.preventDefault();
              navigate('/register');
            }}
          >
            Register
          </button>
        </span>
        <span>
          <button
            className='btn btn-primary auth'
            onClick={(e) => {
              e.preventDefault();
              navigate('/login');
            }}
          >
            Login
          </button>
        </span>
      </div>
      <div className='options'>
        <div className='profileImage'>
          <img
            src='http://localhost:5025/api/file/1644073636050-sandesh-Cofee Please.png'
            className='profile-image'
            alt='profile'
          />
        </div>
      </div>
    </div>
  );
};

export default TopBar;

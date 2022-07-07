import {
  Close,
  ContactSupport,
  ExitToApp,
  Home,
  Info,
  LinkSharp,
  Person,
  RssFeed
} from '@material-ui/icons';
import { useState } from 'react';
import './SideBar.css';

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  return (
    <>
      {isExpanded ? (
        <div className='card sidebar'>
          <div className='card-header top'>
            <span>LearnO</span>
            <span
              onClick={(e) => {
                e.preventDefault();
                setIsExpanded(!isExpanded);
              }}
            >
              <Close />
            </span>
          </div>
          <div className='card-body'>
            <ul className='list-group list-group-flush'>
              <li className='list-group-item'>
                <Home />
                <span> Home</span>
              </li>
              <li className='list-group-item'>
                <Info />
                <span> About</span>
              </li>
              <li className='list-group-item'>
                <ContactSupport />
                <span> Contacts</span>
              </li>
              <li className='list-group-item'>
                <RssFeed />
                <span> Blog</span>
              </li>
              <li className='list-group-item'>
                <Person />
                <span> Admin</span>
              </li>
              <li className='list-group-item'>
                <LinkSharp />
                <span> Links</span>
              </li>
            </ul>
          </div>
          <div className='card-footer'>
            <ExitToApp />
            <span> Logout</span>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SideBar;

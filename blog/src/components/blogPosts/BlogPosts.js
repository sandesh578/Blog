import {
  MoreVert,
  Comment,
  Share,
  ThumbUpSharp,
  AccessTime
} from '@material-ui/icons';
import React, { useState } from 'react';
import './BlogPosts.css';
import TimeAgo from 'react-timeago';

const BlogPosts = ({ title, desc, img, updatedAt }) => {
  const [isTruncated, setTruncated] = useState(true);
  const content = isTruncated ? desc.slice(0, 200) : desc;
  return (
    <div className='card'>
      <div className='card-header'>
        <div className='profile'>
          <div className='profileImg'>
            <img src={img} className='profile-img' alt='profile' />
          </div>
          <div className='post-info'>
            <span className='author'>Sandesh Parajuli</span>
            <span className='time'>
              <AccessTime className='time-icon' /> <TimeAgo date={updatedAt} />
            </span>
          </div>
        </div>
        <div className='option'>
          <a role='button'>
            <MoreVert />
          </a>
        </div>
      </div>
      <div className='card-body'>
        <h5 className='card-title'>{title}</h5>
        <p className='card-text'>{content}</p>
        {desc.length < 100 ? (
          ''
        ) : isTruncated ? (
          <button
            className='btn btn-primary'
            onClick={(e) => {
              e.preventDefault();
              setTruncated(!isTruncated);
            }}
          >
            ReadMore
          </button>
        ) : (
          <button
            className='btn btn-primary'
            onClick={(e) => {
              e.preventDefault();
              setTruncated(!isTruncated);
            }}
          >
            ReadLess
          </button>
        )}
      </div>
      <img src={img} className='card-img-top' alt='topic' />
      <div className='card-footer'>
        <span>
          <ThumbUpSharp />
        </span>
        <span>
          <Comment />
        </span>
        <span>
          <Share />
        </span>
      </div>
    </div>
  );
};

export default BlogPosts;

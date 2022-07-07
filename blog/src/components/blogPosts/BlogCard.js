import React from 'react';
import TimeAgo from 'react-timeago';

const BlogCard = ({ title, desc, img, updatedAt }) => {
  return (
    <div class='container'>
      <div class='row'>
        <div class='col-12 col-sm-8 col-md-6 col-lg-4'>
          <div class='card'>
            <img class='card-img' src={img} alt='text' />
            <div class='card-img-overlay'>
              <a href='#' class='btn btn-light btn-sm'>
                React
              </a>
            </div>
            <div class='card-body'>
              <h4 class='card-title'>{title}</h4>
              <small class='text-muted cat'>
                <i class='far fa-clock text-info'></i>{' '}
                <TimeAgo date={updatedAt} />
                <i class='fa fa-users text-info'></i> 4 portions
              </small>
              <p class='card-text'>{desc}</p>
              <a href='#' class='btn btn-info'>
                Read Recipe
              </a>
            </div>
            <div class='card-footer text-muted d-flex justify-content-between bg-transparent border-top-0'>
              <div class='views'>Oct 20, 12:45PM</div>
              <div class='stats'>
                <i class='far fa-eye'></i> 1347
                <i class='far fa-comment'></i> 12
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

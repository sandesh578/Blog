import { useState } from 'react';
import {
  MoreVert,
  Comment,
  Share,
  ThumbUpSharp,
  AccessTime
} from '@material-ui/icons';
import './Card.scss';
import TimeAgo from 'react-timeago';

const CardLeft = ({ title, desc, img, updatedAt }) => {
  const [isDark, setDark] = useState(false);
  const [isTruncated, setTruncated] = useState(false);
  const content = isTruncated ? desc.slice(0, 200) : desc;
  return (
    <div>
      <section class={isDark ? 'dark' : 'light'}>
        <div class='container py-4'>
          <h1
            class='h1 text-center'
            id='pageHeaderTitle'
            onClick={(e) => {
              e.preventDefault();
              setDark(!isDark);
            }}
          >
            Change theme
          </h1>

          <article class='postcard dark green'>
            <a class='postcard__img_link' href='#'>
              <img
                class='postcard__img'
                src={img == undefined ? 'https://picsum.photos/1000/1000' : img}
                alt='Image Title'
              />
            </a>
            <div class='postcard__text'>
              <h1 class='postcard__title blue'>
                <a href='#'>{title}</a>
              </h1>
              <div class='postcard__subtitle small'>
                <AccessTime /> <TimeAgo date={updatedAt} />
              </div>
              <div class='postcard__bar'></div>
              <div class='postcard__preview-txt'>{content}</div>

              <ul class='postcard__tagbox'>
                <li class='tag__item'>
                  <i class='fas fa-tag mr-2'></i>
                  {!desc ? (
                    ''
                  ) : isTruncated ? (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setTruncated(!isTruncated);
                      }}
                    >
                      ReadMore
                    </a>
                  ) : (
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setTruncated(!isTruncated);
                      }}
                    >
                      ReadLess
                    </a>
                  )}
                </li>
                <li class='tag__item'>
                  <i class='fas fa-clock mr-2'></i>55 mins.
                </li>
                <li class='tag__item play blue'>
                  <a href='#'>
                    <i class='fas fa-play mr-2'></i>Play Episode
                  </a>
                </li>
              </ul>
            </div>
          </article>

          <article class='postcard dark red'>
            <a class='postcard__img_link' href='#'>
              <img
                class='postcard__img'
                src={img == undefined ? 'https://picsum.photos/501/500' : img}
                alt='Image Title'
              />
            </a>
            <div class='postcard__text'>
              <h1 class='postcard__title red'>
                <a href='#'>{title}</a>
              </h1>
              <div class='postcard__subtitle small'>
                <time datetime='2020-05-25 12:00:00'>
                  <i class='fas fa-calendar-alt mr-2'></i>
                  <TimeAgo date={updatedAt} />
                </time>
              </div>
              <div class='postcard__bar'></div>
              <div class='postcard__preview-txt'>{content}</div>
              <ul class='postcard__tagbox'>
                {!desc < 100 ? (
                  ''
                ) : isTruncated ? (
                  <li class='tag__item'>
                    <i class='fas fa-tag mr-2'></i>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setTruncated(!isTruncated);
                      }}
                    >
                      ReadMore
                    </a>
                  </li>
                ) : (
                  <li class='tag__item'>
                    <i class='fas fa-tag mr-2'></i>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setTruncated(!isTruncated);
                      }}
                    >
                      ReadLess
                    </a>
                  </li>
                )}

                <li class='tag__item'>
                  <i class='fas fa-clock mr-2'></i>55 mins.
                </li>
                <li class='tag__item play red'>
                  <a href='#'>
                    <i class='fas fa-play mr-2'></i>Play Episode
                  </a>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default CardLeft;

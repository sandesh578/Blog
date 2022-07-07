import { useEffect, useState } from 'react';
// import './Blog.css';
import axios from 'axios';
import CardLeft from '../Card/CardLeft';
import CardRight from '../Card/CardRight';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios.get('http://localhost:5025/api/blogs', {
        headers: {
          token: localStorage.getItem('token')
        }
      });
      setBlogs(res.data.blogs);
    }
    fetchData();
  }, []);
  return (
    <div className='blog'>
      {blogs.map((element, i) => {
        console.log(element);
        const { title, desc, img, updatedAt } = element;
        return (
          <div>
            {/* {i % 2 === 0 ? ( */}
            <CardLeft
              key={i}
              title={title}
              desc={desc}
              img={img}
              updatedAt={updatedAt}
            />
            {/* ) : (
               <CardRight
                key={i}
                title={title}
                desc={desc}
                img={img}
                updatedAt={updatedAt}
              />
            )} */}
          </div>
        );
      })}
    </div>
  );
};

export default Blog;

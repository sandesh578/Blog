import { useState } from 'react';
import './PostForm.css';
import axios from 'axios';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImg] = useState('');
  return (
    <div className='postForm'>
      <div className='row g-3'>
        <div className='col-mb-6'>
          <label className='form-label'>Enter Title For The Blog</label>
          <input
            type='text'
            className='form-control'
            onChange={(e) => {
              e.preventDefault();
              setTitle(e.target.value);
            }}
            placeholder='Enter title'
          />
        </div>
        <div className='col-mb-6'>
          <label className='form-label'>Enter Content Of The Blog</label>
          <textarea
            className='form-control'
            rows='10'
            onChange={(e) => {
              e.preventDefault();
              setDesc(e.target.value);
            }}
          ></textarea>
        </div>
        <div className='col-mb-6'>
          <label className='form-label'>Upload the image</label>
          <input
            type='file'
            className='form-control'
            onChange={(e) => {
              e.preventDefault();
              setImg(e.target.files[0]);
            }}
            accept='image/*'
          />
        </div>
        <div className='col-mb-6'>
          <button
            className='btn btn-primary'
            onClick={async (e) => {
              e.preventDefault();
              let formData = new FormData();
              formData.append('file', img);
              const image = await axios.post(
                'http://localhost:5025/api/upload',
                formData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data'
                  }
                }
              );
              const res = await axios.post(
                'http://localhost:5025/api/blogs',
                {
                  title,
                  desc,
                  img: image.data.file
                },
                {
                  headers: {
                    token:
                      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYmYyMmYzNTAwNzU3ZWYyMzRlNDE5YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzOTkyMTA5NywiZXhwIjoxNjQwMzUzMDk3fQ.DSpJH5R3as05iH0vS03abEDsa5ycb5p61SwS2ITUbpQ'
                  }
                }
              );
              console.log(res);
            }}
          >
            Publish Blog
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostForm;

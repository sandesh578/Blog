import { useRef } from 'react';
import './Login.css';
import axios from 'axios';

const Login = () => {
  const email = useRef('');
  const password = useRef('');

  return (
    <form className='row g-3 form'>
      <div className='col-md-4'>
        <label for='email' className='form-label'>
          Email
        </label>
        <input
          type='email'
          className='form-control'
          id='email'
          ref={email}
          required
        />
        <div id='emailFeedback' className='invalid-feedback'>
          Please provide a valid email.
        </div>
      </div>
      <div className='col-md-4'>
        <label for='password' className='form-label'>
          Password
        </label>
        <input
          type='password'
          className='form-control'
          id='password'
          ref={password}
          required
        />
        <div id='passwordFeedback' className='invalid-feedback'>
          Please provide a valid password.
        </div>
      </div>
      <div className='col-md-4'>
        <p>
          Create new account?
          {/* <Link to='/register'> Register</Link> */}
        </p>
      </div>
      <div className='col-md-4'>
        <button
          className='btn btn-primary login'
          type='submit'
          onClick={async (e) => {
            e.preventDefault();
            const res = await axios.post(
              'http://localhost:5025/api/auth/login',
              {
                email: email.current.value,
                password: password.current.value
              }
            );
            console.log(res);
            localStorage.setItem('token', `Bearer ${res.data.accessToken}`);
          }}
        >
          Login
        </button>
      </div>
      <div className='col-md-4'>
        <h6>
          By clicking <b>Login </b>,you are in agreement of the
          <u>Terms of use</u> and <u>Privacy policy</u>
        </h6>
      </div>
    </form>
  );
};

export default Login;

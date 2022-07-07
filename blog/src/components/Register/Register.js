import axios from 'axios';
import { useRef } from 'react';
import './Register.css';

const Register = () => {
  const firstName = useRef('');
  const lastName = useRef('');
  const email = useRef('');
  const password = useRef('');
  const retypePassword = useRef('');

  return (
    <form className='row g-3 form'>
      <div className='col-md-4'>
        <label for='firstName' className='form-label'>
          First name
        </label>
        <input
          type='text'
          className='form-control'
          id='firstName'
          ref={firstName}
          required
        />
        <div className='valid-feedback'>Looks good!</div>
      </div>
      <div className='col-md-4'>
        <label for='lastName' className='form-label'>
          Last name
        </label>
        <input
          type='text'
          className='form-control'
          id='lastName'
          ref={lastName}
          required
        />
        <div className='valid-feedback'>Looks good!</div>
      </div>
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
        <label for='retype-password' className='form-label'>
          Retype Password
        </label>
        <input
          type='password'
          className='form-control'
          id='retype-password'
          ref={retypePassword}
          required
        />
        <div id='retypePasswordFeedback' className='invalid-feedback'>
          {/* {
            Please provide a valid password.
          } */}
        </div>
      </div>
      <div className='col-md-4'>
        <p>
          Already have an account?
          {/* <Link to='/login'> Login</Link> */}
        </p>
      </div>
      <div className='col-md-4'>
        <button
          className='btn btn-primary Register'
          type='submit'
          onClick={async (e) => {
            e.preventDefault();
            console.log({
              firstName: firstName.current.value,
              lastName: lastName.current.value,
              email: email.current.value,
              password: password.current.value
            });
            const res = await axios.post(
              'http://localhost:5025/api/auth/register',
              {
                firstName: firstName.current.value,
                lastName: lastName.current.value,
                email: email.current.value,
                password: password.current.value
              }
            );
            console.log(res);
          }}
        >
          Register
        </button>
      </div>
      <div className='col-md-4'>
        <h6>
          By clicking <b>Register </b>,you are in agreement of the{' '}
          <u>Terms of use</u> and <u>Privacy policy</u>
        </h6>
      </div>
    </form>
  );
};

export default Register;

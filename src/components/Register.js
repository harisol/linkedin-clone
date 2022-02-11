import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../css/Login.css';
import { login } from '../features/userSlice';
import { auth } from '../my-firebase-config';
import Login from './Login';

function Register() {
  const dispatch = useDispatch();
  // states
  const [inputs, setInputs] = useState({});
  const [page, setPage] = useState('register');

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    /* dynamically set state by key value */
    setInputs({ ...inputs, [name]: value });
    /* or like this */
    // setInputs((previousValues) => ({ ...previousValues, [name]: value }));
  };

  const loginUser = () => {
    setPage('login');
  };

  const registerUser = async (e) => {
    e.preventDefault();
    let error = false;

    const userData = {
      displayName: inputs.fullName,
      photoURL: inputs.picUrl,
    };

    // create new user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      inputs.email,
      inputs.password
    ).catch((e) => {
      error = true;
      alert(e.message || e);
    });

    if (error) return;

    // complete the new created user data
    await updateProfile(userCredential.user, userData);

    // insert user data to redux store and will redirect to main page
    dispatch(
      login({
        email: userCredential.user.email,
        uid: userCredential.user.uid,
        ...userData,
      })
    );
  };

  return page === 'login' ? (
    <Login action={() => setPage('register')} />
  ) : (
    <div className="login">
      <img
        src="https://logos-download.com/wp-content/uploads/2016/03/LinkedIn_Logo_2019.png"
        alt=""
      />
      <form onSubmit={registerUser}>
        <input
          required
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={inputs.fullName || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={inputs.email || ''}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={inputs.password || ''}
          onChange={handleChange}
        />
        <input
          type="text"
          name="picUrl"
          placeholder="Profile Picture Url"
          value={inputs.picUrl || ''}
          onChange={handleChange}
        />
        {/* "event" argument is still passed if we call function without argument like this */}
        <button type="submit">Register</button>
      </form>

      <p>
        Already member?
        <span className="login__register" onClick={loginUser}>
          &nbsp; Log in
        </span>
      </p>
    </div>
  );
}

export default Register;

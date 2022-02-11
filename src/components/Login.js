import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import '../css/Login.css';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../my-firebase-config';

export default function Login({
  action = () => console.log('no action provided'),
}) {
  const dispatch = useDispatch();

  // local state and the handler
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // if there is so many input, it's not effective to set so many handler.
  // so we can write like this.
  // but we must add "name" attribute to each input
  // read more about handle every type of input in here
  // https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react
  const [inputs, setInputs] = useState({});
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    /* dynamically set state by key value */
    setInputs({ ...inputs, [name]: value });
    /* or like this */
    // setInputs((previousValues) => ({ ...previousValues, [name]: value }));
  };

  const loginUser = (event) => {
    event.preventDefault();

    if (!email || !password) {
      return alert('please enter email and password');
    }

    // login with firebase auth
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // insert user data to redux store
        dispatch(
          login({
            email: userCredential.user.email,
            uid: userCredential.user.uid,
            displayName: userCredential.user.displayName,
            photoURL: userCredential.user.photoURL,
          })
        );
      })
      .catch((error) => alert(error.message || error));
  };

  return (
    <div className="login">
      <img
        src="https://logos-download.com/wp-content/uploads/2016/03/LinkedIn_Logo_2019.png"
        alt=""
      />
      <form>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          placeholder="Don't mind this"
          name="somekey"
          value={inputs.somekey || ''}
          onChange={handleChange}
        />
        {/* "event" argument is still passed if we call function without argument like this */}
        <button onClick={loginUser}>Login</button>
      </form>

      <p>
        Not a member?
        <span className="login__register" onClick={() => action()}>
          &nbsp; Register Now
        </span>
      </p>
    </div>
  );
}

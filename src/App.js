import './App.css';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import Feed from './components/Feed';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './my-firebase-config';
import { useDispatch } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';

function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    // check if user is logged in
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoURL: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      {!user ? (
        <Register />
      ) : (
        <>
          {/*we use this empty tag because jsx must have one parent element, But this won't be rendered*/}
          <Header />
          <div className="app__body">
            <Sidebar />
            <Feed />
            {/* <Widgets /> */}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import '../css/Header.css';
import HeaderOption from './HeaderOption';
import {
  Home,
  SupervisorAccount,
  BusinessCenter,
  Chat,
  Notifications,
  ExitToApp,
} from '@material-ui/icons';
import { useDispatch } from 'react-redux';
import { logout } from '../features/userSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../my-firebase-config';

export default function Header() {
  const dispatch = useDispatch();
  const logoutUser = () => {
    // clear user data in redux
    dispatch(logout());

    // logout from firebase auth
    signOut(auth);
  };

  const comingSoon = () => {
    alert('No function yet. Try logout icon');
  };

  const funcWithEventArgument = (arg1, arg2, e) => {
    /*
		'e' represents the React event that triggered the function.
    In this case, the 'click' event
		*/
    alert(`${arg1} - ${arg2} - ${e.type}`);
  };
  const funcWithoutEventArgument = (arg1, arg2) => {
    alert(`${arg1} - ${arg2}`);
  };

  return (
    <div className="header">
      <div className="header__left">
        <img src="https://cdn-icons-png.flaticon.com/128/174/174857.png" />

        <div className="header__search">
          <SearchIcon />
          <input type="text" />
        </div>
      </div>
      <div className="header__right">
        <HeaderOption Icon={Home} title="Home" onClick={comingSoon} />
        <HeaderOption
          Icon={SupervisorAccount}
          title="My Network"
          onClick={() => funcWithoutEventArgument('SomeArg1', 'SomeArg2')}
        />
        <HeaderOption
          Icon={BusinessCenter}
          title="My Network"
          onClick={(e) => funcWithEventArgument('SomeArg1', 'SomeArg2', e)}
        />
        <HeaderOption Icon={Chat} title="My Network" onClick={comingSoon} />
        <HeaderOption
          Icon={Notifications}
          title="My Network"
          onClick={comingSoon}
        />
        <HeaderOption
          avatar="https://compassionate-leakey-e9b16b.netlify.app/images/IG_Sonny.jpeg"
          title="me"
        />
        <HeaderOption Icon={ExitToApp} title="Logout" onClick={logoutUser} />
      </div>
    </div>
  );
}

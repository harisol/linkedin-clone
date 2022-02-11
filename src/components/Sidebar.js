import '../css/Sidebar.css';
import { Avatar } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

function Sidebar() {
  const user = useSelector(selectUser);

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img
          src="https://t4.ftcdn.net/jpg/03/01/71/45/360_F_301714556_aXSmQy6VgFPKnrM3WYD5lUxZrnbYN10o.jpg"
          alt=""
        />
        <Avatar className="sidebar__avatar" />
        <h2>{user.displayName}</h2>
        <h4>{user.email}</h4>
      </div>

      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who Viewed you</p>
          <p className="sidebar__statNumber">2,543</p>
        </div>
        <div className="sidebar__stat">
          <p>Views on post</p>
          <p className="sidebar__statNumber">400</p>
        </div>
      </div>
      <div className="sidebar__bottom">
        <p style={{ marginBottom: '10px' }}>Recent</p>
        {recentItem('reactjs')}
        {recentItem('programming')}
        {recentItem('engineering')}
        {recentItem('design')}
      </div>
    </div>
  );
}

const recentItem = (topic) => (
  <div className="sidebar__recentItem">
    <span className="sidebar__hash">#</span>
    <p>{topic}</p>
  </div>
);

export default Sidebar;

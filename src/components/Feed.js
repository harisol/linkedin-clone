import '../css/Feed.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../features/userSlice';
import {
  addDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { collectionRef } from '../my-firebase-config';
import { selectUser } from '../features/userSlice';
import InputOption from './InputOption';
import Post from './Post';
import {
  EventNote as EventNoteIcon,
  Subscriptions as SubscriptionsIcon,
  Create as CreateIcon,
  Image as ImageIcon,
  CalendarViewDay as CalendarViewDayIcon,
} from '@material-ui/icons';

const postCollection = 'posts';

function Feed() {
  const [posts, setPosts] = useState([]);
  const [input, setInput] = useState('');
  const user = useSelector(selectUser);

  useEffect(() => {
    onSnapshot(
      query(collectionRef(postCollection), orderBy('timestamp', 'desc')),
      async (snapshot) => {
        const _posts = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        setPosts(_posts);
      }
    );
  }, []); // set empty to call this once on first render

  const sendPost = (e) => {
    e.preventDefault();
    addDoc(collectionRef(postCollection), {
      name: user?.displayName || 'Guest',
      description: 'this is a test',
      message: input,
      photoUrl: '',
      timestamp: serverTimestamp(), // use server timestamp so if user post in different region, it still use the server timestamp
    });

    setInput('');
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form onSubmit={sendPost}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit">Send</button>
          </form>
        </div>
        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon} title="Photo" color="#70B5F9" />
          <InputOption Icon={SubscriptionsIcon} title="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} title="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            title="Write article"
            color="#7FC15E"
          />
        </div>
      </div>

      {posts.map(({ data, id }) => (
        <Post
          name={data.name}
          description={data.description}
          message={data.message}
          key={id}
        />
      ))}
    </div>
  );
}

export default Feed;

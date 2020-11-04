import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Post from './Post';
import './Feed.css';
import {
  Calendar,
  Camera,
  CameraVideo,
  Newspaper,
  PencilSquare,
} from 'react-bootstrap-icons';
import db from '../firebase';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const Feed = () => {
  const [posts, setPosts] = useState();
  const user = useSelector(selectUser);

  useEffect(() => {
    if (user) {
      db.collection('posts')
        .orderBy('timestamp', 'desc')
        .onSnapshot((snapshot) =>
          setPosts(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    }
  }, [user]);

  const newPostHandler = () => {
    const input = prompt('Enter your post');
    console.log(input);
    if (input) {
      db.collection('posts').add({
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        info: input,
        uid: user.uid,
        photo: user.photo,
        email: user.email,
        displayName: user.displayName,
      });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row d-flex">
        <div className="col"></div>
        <div className="col-5 mx-3">
          <Card className="mb-3 new-post shadow">
            <Card.Body
              className="border-bottom new-post-area"
              onClick={newPostHandler}
            >
              <div className="d-flex align-items-center">
                <PencilSquare className="flex-grow-0 text-secondary mr-2" />
                <div className="flex-grow-1 new-post-input text-secondary">
                  Start a post
                </div>
              </div>
            </Card.Body>
            <Card.Body className="d-flex flex-row justify-content-between text-secondary">
              <div className="new-post-buttons d-flex align-items-center">
                <Camera
                  style={{ color: '#0077b5', fontSize: 'x-large' }}
                  className="mr-1"
                />
                Photo
              </div>
              <div className="new-post-buttons d-flex align-items-center">
                <CameraVideo
                  style={{ color: '#665ed0', fontSize: 'x-large' }}
                  className="mr-1"
                />
                Video
              </div>
              <div className="new-post-buttons d-flex align-items-center">
                <Calendar
                  style={{ color: '#b74700', fontSize: 'x-large' }}
                  className="mr-1"
                />
                Event
              </div>
              <div className="new-post-buttons d-flex align-items-center">
                <Newspaper
                  style={{ color: '#e94435', fontSize: 'x-large' }}
                  className="mr-1"
                />
                Article
              </div>
            </Card.Body>
          </Card>
          <div className="mb-3 feed-line"></div>
          {posts?.map((post, index) => (
            <Post
              key={index}
              name={post.data.displayName}
              timestamp={post.data.timestamp}
              info={post.data.info}
              photo={post.data.photo}
              uid={post.data.uid}
            />
          ))}
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};

export default Feed;

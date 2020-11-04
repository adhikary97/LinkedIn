import React, { useEffect, useState } from 'react';
import db from '../firebase';
import { Card } from 'react-bootstrap';
import {
  ChatRightText,
  Cursor,
  HandThumbsUp,
  Reply,
  ThreeDots,
} from 'react-bootstrap-icons';
import './Post.css';

const Post = (props) => {
  const { name, timestamp, info, photo, uid } = props;
  const [position, setPosition] = useState();

  useEffect(() => {
    db.collection('position')
      .where('uid', '==', uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setPosition(doc.data().info);
        });
      });
  }, [uid]);

  return (
    <Card
      bg="light"
      text="dark"
      style={{ width: '18rem' }}
      className="mb-2 w-100 card-post shadow border"
    >
      <Card.Body>
        <Card.Title>
          <div className="container">
            <div className="row">
              <img
                alt="post"
                src={photo}
                height={50}
                width={50}
                className="rounded-circle"
              />
              <div className="col">
                <h5 className="mb-0">{name}</h5>
                <p className="mb-0 card-subtext">{position}</p>
                <p className="card-subtext">
                  Posted: {new Date(timestamp?.toDate()).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
          <ThreeDots className="three-dots rounded-circle" />
        </Card.Title>
        <Card.Text>{info}</Card.Text>
        <div className="container border-top">
          <div className="d-flex justify-content-start row mt-2 card-bottom">
            <div className="d-flex flex-row align-items-center justify-content-between card-bottom-buttons">
              <HandThumbsUp className="button-icons" />
              Like
            </div>
            <div className="d-flex flex-row align-items-center card-bottom-buttons">
              <ChatRightText className="button-icons" />
              Comment
            </div>
            <div className="d-flex flex-row align-items-center card-bottom-buttons">
              <Reply className="button-icons" />
              Share
            </div>
            <div className="d-flex flex-row align-items-center card-bottom-buttons">
              <Cursor className="button-icons" />
              Send
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Post;

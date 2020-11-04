import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Experience from './Experience';
import './Profile.css';
import db, { auth } from '../firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { Pencil } from 'react-bootstrap-icons';
import firebase from 'firebase';
import ModalView from './ModalView';

const Profile = () => {
  const user = useSelector(selectUser);
  const [about, setAbout] = useState('Enter an about');
  const [position, setPosition] = useState('Enter a position');
  const [experiences, setExperiences] = useState([]);
  const [education, setEducation] = useState([]);

  useEffect(() => {
    db.collection('about')
      .where('uid', '==', user.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setAbout(doc.data().info);
        });
      });

    db.collection('position')
      .where('uid', '==', user.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          setPosition(doc.data().info);
        });
      });

    db.collection('experiences')
      .where('uid', '==', user.uid)
      .get()
      .then((snapshot) => {
        setExperiences(snapshot.docs.map((doc) => doc.data()));
      });

    db.collection('education')
      .where('uid', '==', user.uid)
      .get()
      .then((snapshot) => {
        setEducation(snapshot.docs.map((doc) => doc.data()));
      });
  }, [user.uid]);

  const addInfo = (collection) => {
    const input = prompt(`Enter your ${collection}`);
    if (input) {
      console.log(input);
      if (input) {
        db.collection(collection).doc(user.uid).set({
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          info: input,
          uid: user.uid,
        });
        collection === 'position' ? setPosition(input) : setAbout(input);
      }
    }
  };

  return (
    <div className="d-flex justify-content-center flex-column profile">
      <Card className="flex-grow-1 mb-5 shadow profile-section">
        <Card.Body className="banner" />
        <img
          className="profile-pic rounded-circle shadow"
          alt="profile"
          src={user.photo}
          onClick={() => auth.signOut()}
        />
        <Card.Body className="mt-5">
          <h4 className="profile-text">{user.displayName}</h4>
          <h5 className="profile-text">{position}</h5>
          <div className="d-flex flex-row">
            <p className="mr-3">San Francisco, CA</p>
            <li>377 connections</li>
          </div>
          <Pencil
            className="edit edit-profile rounded"
            onClick={() => addInfo('position')}
          />
        </Card.Body>
      </Card>
      <Card className="mb-5 shadow profile-section">
        <Card.Body>
          <h5 className="profile-text mb-3">About</h5>
          <Card.Text>{about}</Card.Text>
          <Pencil
            className="edit edit-about rounded"
            onClick={() => addInfo('about')}
          />
        </Card.Body>
      </Card>
      <Card className="shadow mb-5 profile-section">
        <Card.Body className="border-bottom">
          <h5 className="profile-text mb-3">Experience</h5>
          <ModalView
            experienceRef={experiences}
            setExperienceRef={setExperiences}
            toggle={false}
          />
          {experiences.length > 0 ? (
            experiences.map((experience, ind) => (
              <Experience
                key={ind}
                title={experience.title}
                company={experience.company}
                dates={experience.dates}
                location={experience.location}
                imageUrl={experience.imageUrl}
                description={experience.description}
              />
            ))
          ) : (
            <div>Add an experience</div>
          )}
        </Card.Body>
        <Card.Body>
          <h5 className="profile-text mb-3">Education</h5>
          <ModalView
            experienceRef={education}
            setExperienceRef={setEducation}
            toggle={true}
          />
          {education.length > 0 ? (
            education.map((ed, ind) => (
              <Experience
                key={ind}
                title={ed.title}
                company={ed.company}
                dates={ed.dates}
                location={ed.location}
                imageUrl={ed.imageUrl}
                description={ed.description}
              />
            ))
          ) : (
            <div>Add an education</div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;

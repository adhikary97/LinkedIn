import React, { useState } from 'react';
import db from '../firebase';
import firebase from 'firebase';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';
import { Modal, Button } from 'react-bootstrap';
import { Pencil } from 'react-bootstrap-icons';
import './ModalView.css';

const ModalView = (props) => {
  const user = useSelector(selectUser);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [dates, setDates] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleClose = () => {
    handleClear();
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleInput = (input, key) => {
    switch (key) {
      case 'title':
        setTitle(input);
        break;
      case 'company':
        setCompany(input);
        break;
      case 'dates':
        setDates(input);
        break;
      case 'location':
        setLocation(input);
        break;
      case 'imageUrl':
        setImageUrl(input);
        break;
      case 'description':
        setDescription(input);
        break;
      default:
        break;
    }
  };

  const handleClear = () => {
    setTitle('');
    setCompany('');
    setDates('');
    setLocation('');
    setImageUrl('');
    setDescription('');
  };

  const addExperience = () => {
    if (title && company && dates && location && imageUrl && description) {
      const experience = {
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        uid: user.uid,
        title: title,
        company: company,
        dates: dates,
        location: location,
        imageUrl: imageUrl,
        description: description,
      };
      db.collection(props.toggle ? 'education' : 'experiences').add(experience);
      props.setExperienceRef([...props.experienceRef, experience]);
      handleClear();
      handleClose();
    } else {
      alert('Fill in all fields');
    }
  };

  return (
    <>
      <Pencil
        className={`edit ${
          props.toggle ? 'edit edit-education' : 'edit-experience rounded'
        }`}
        onClick={handleShow}
      />

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Add {props.toggle ? 'Education' : 'Experience'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          <div className="d-flex flex-column mb-3">
            <p className="mb-0">Title:</p>
            <input
              placeholder="Enter Title"
              value={title}
              onChange={(event) => handleInput(event.target.value, 'title')}
              className="flex-grow-1"
            />
          </div>
          <div className="d-flex flex-column mb-3">
            <p className="mb-0">{props.toggle ? 'Institution:' : 'Company:'}</p>
            <input
              placeholder={`Enter ${props.toggle ? 'Institution' : 'Company'}`}
              value={company}
              onChange={(event) => handleInput(event.target.value, 'company')}
              className="flex-grow-1"
            />
          </div>
          <div className="d-flex flex-column mb-3">
            <p className="mb-0">Dates:</p>
            <input
              placeholder={`Enter Time Period ${
                props.toggle ? 'Attended' : 'Employed'
              }`}
              value={dates}
              onChange={(event) => handleInput(event.target.value, 'dates')}
              className="flex-grow-1"
            />
          </div>
          <div className="d-flex flex-column mb-3">
            <p className="mb-0">Location:</p>
            <input
              placeholder="Enter Location"
              value={location}
              onChange={(event) => handleInput(event.target.value, 'location')}
              className="flex-grow-1"
            />
          </div>
          <div className="d-flex flex-column mb-3">
            <p className="mb-0">Image Url:</p>
            <input
              placeholder="Enter Company Image url"
              value={imageUrl}
              onChange={(event) => handleInput(event.target.value, 'imageUrl')}
              className="flex-grow-1"
            />
          </div>
          <div className="d-flex flex-column">
            <p className="mb-0">Description:</p>
            <input
              placeholder="Enter Description of Responsibilities"
              value={description}
              onChange={(event) =>
                handleInput(event.target.value, 'description')
              }
              className="flex-grow-1"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="save-button" onClick={addExperience}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalView;

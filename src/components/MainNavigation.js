import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {
  Bell,
  ChatRightText,
  HouseDoorFill,
  People,
} from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import './MainNavigation.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../features/userSlice';

const MainNavigation = () => {
  const [currentKey, setCurrentKey] = useState(1);
  const path = window.location.pathname;
  const user = useSelector(selectUser);

  useEffect(() => {
    switch (path) {
      case '/profile':
        setCurrentKey(2);
        break;
      default:
        setCurrentKey(1);
        break;
    }
  }, [path]);

  return (
    <Navbar className="py-0 mb-5 navbar">
      <Navbar.Brand
        as={Link}
        to="/"
        onClick={() => setCurrentKey(1)}
        className="ml-5 py-0 d-flex align-items-center"
      >
        <img
          src="https://cdn2.iconfinder.com/data/icons/popular-social-media-flat/48/Popular_Social_Media-22-512.png"
          height="65"
          width="65"
          alt="logo"
        />
        <input placeholder="Search" className="rounded search" />
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav
          className="justify-content-end mr-5 d-flex mb-0"
          activeKey={currentKey}
          onSelect={(selectedKey) => {
            setCurrentKey(selectedKey);
          }}
        >
          <Nav.Link
            as={Link}
            eventKey={1}
            to="/"
            className={`text-white ${currentKey === 1 && 'nav-links'}`}
          >
            <div className="d-flex flex-column align-items-center">
              <HouseDoorFill className="nav-icons flex-0" />
              <p className="mb-0">Home</p>
            </div>
          </Nav.Link>
          <Nav.Link eventKey={currentKey} className="text-white">
            <div className="d-flex flex-column align-items-center">
              <People className="nav-icons" />
              <p>My Network</p>
            </div>
          </Nav.Link>
          <Nav.Link eventKey={currentKey} className="text-white">
            <div className="d-flex flex-column align-items-center">
              <ChatRightText className="nav-icons" />
              <p>Messaging</p>
            </div>
          </Nav.Link>
          <Nav.Link eventKey={currentKey} className="text-white">
            <div className="d-flex flex-column align-items-center">
              <Bell className="nav-icons" />
              <p>Notifications</p>
            </div>
          </Nav.Link>
          <Nav.Link
            as={Link}
            eventKey={2}
            to="/profile"
            className={`text-white ${currentKey === 2 && 'nav-links'}`}
          >
            <div className="d-flex flex-column align-items-center">
              <img
                alt="profile"
                src={user.photo}
                height={25}
                width={25}
                className="rounded-circle border border-light"
              />
              <p className="mb-0">Profile</p>
            </div>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNavigation;

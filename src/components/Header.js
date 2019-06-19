import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
  return (
    <Navbar className="justify-content-md-center" bg="dark" variant="dark">
      <Navbar.Brand href="#home">{'Reduxify'}</Navbar.Brand>
    </Navbar>
  );
};

export default Header;

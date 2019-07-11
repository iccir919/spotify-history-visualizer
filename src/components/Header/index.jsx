import React from 'react';
import { connect } from 'react-redux';
import { Navbar, Nav, Container, Row, Col } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import { fetchUserProfile } from '../../actions/user';
import { signOut } from '../../actions/auth';
import logo from '../../assets/logo.png';
import './Header.css';

class Header extends React.Component {
  componentDidMount() {
    this.props.fetchUserProfile();
  }

  render() {
    if (!this.props.user.profile) return null;

    return (
      <Navbar expand="md">
        <Navbar.Brand id="reduxify-logo">
          <img src={logo} />
          Reduxify
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Container>
            <Row>
              <Col md={7}>
                <Nav>
                  <Nav.Item>
                    <Link className="nav-link" to="/topArtists">
                      Top Artists
                    </Link>
                  </Nav.Item>
                  <Nav.Link disabled>Top Songs</Nav.Link>
                  <Nav.Link disabled>Recent</Nav.Link>
                </Nav>
              </Col>
              <Col md={5}>
                <Nav className="justify-content-end">
                  <Nav.Link
                    className="font-weight-bold"
                    href={this.props.user.profile.external_urls.spotify}
                  >
                    {this.props.user.profile.display_name}
                  </Nav.Link>
                  <Nav.Link onClick={this.props.signOut}>Logout</Nav.Link>
                </Nav>
              </Col>
            </Row>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = { fetchUserProfile, signOut };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

import React from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NavBar(props) {
  return (
    <Nav className="justify-content-between" activeKey="home">
      <Nav.Item>
        <Nav.Link className="text-dark" as={Link} to="/">Main Page</Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link className="text-dark" as={Link} to="/posts/new">
          <FontAwesomeIcon
            style={{ fontSize: 20 }}
            icon={faSquarePlus}
          />
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
}

export default NavBar;

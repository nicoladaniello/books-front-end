import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "gatsby";

const Header = () => {
  return (
    <header>
      <div className="bg-light mb-0 pb-0">
        <div className="container">
          <div className="py-3">
            <h1>Title</h1>
          </div>
          <Nav variant="pills" defaultActiveKey="panoramica">
            <Nav.Item>
              <Nav.Link eventKey="panoramica" as={Link} to="/">
                Panoramica
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="periodo" as={Link} to="/">
                Periodo
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fornitori" as={Link} to="/">
                Scheda Fornitori
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fatture" as={Link} to="/">
                Fatture
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="pagamenti" as={Link} to="/">
                Pagamenti
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

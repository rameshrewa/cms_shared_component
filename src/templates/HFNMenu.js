import React, { Fragment } from "react";

// components
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import { Link } from "gatsby";

// constants
const itemsKey = "data",
  idKey = "id",
  urlKey = "link",
  labelKey = "label",
  newTabKey = "new_tab",
  subMenuKey = "submenu",
  subMenuIdKey = "menuitems_id";

const appURI = `${window.location.protocol}//${window.location.hostname}:${window.location.port}`;

const HFNTab = ({
  data = null,
  className = "",
  tabClassName = "",
  tapHeaderClassName = "",
  contentClassName = "",
  onSelect = null,
  tabAttrs = null
}) => {

  return (
    <Fragment>
      {data?.[itemsKey]?.length ? (
        <Navbar collapseOnSelect expand="lg">
          <Navbar.Brand>
            <Link to="/">
              <img src="/images/header/header-logo.png" alt="Logo" className="lazyload" />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="ms-auto">
              {data[itemsKey].map(item => (!item?.[idKey] ? null : item[subMenuKey]?.length > 0 ? (
                <NavDropdown key={item[idKey]} title={item[labelKey]} id="basic-nav-dropdown" >
                  {item[subMenuKey].map(val => { console.log(val);return (!val?.[subMenuIdKey] ? null : (
                    <NavDropdown.Item key={val[subMenuIdKey]}>
                      {
                        val[newTabKey] === 0 ?
                          (<Link className="header-link" to={`/${val[urlKey] || ""}`} > {val[labelKey]} </Link>)
                          : (<a
                            className="header-link"
                            href={val[urlKey].startsWith("http") ? val[urlKey] : `${appURI}/${val[urlKey] || ""}`}
                            target="_blank"
                            rel="noreferrer noopener"
                          >
                            {val[labelKey]}
                          </a>)
                      }
                    </NavDropdown.Item>
                  ));})}
                </NavDropdown>
              ) : (
                <Nav.Item key={item[idKey]}>
                  {
                    item[newTabKey] === 0 ?
                      (<Link className="nav-link" to={`/${item[urlKey] || ""}`} > {item[labelKey]} </Link>)
                      : (<a
                        className="nav-link"
                        href={item[urlKey].startsWith("http") ? item[urlKey] : `${appURI}/${item[urlKey] || ""}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {item[labelKey]}
                      </a>)
                  }
                </Nav.Item>
              )))}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      ) : null}
    </Fragment>
  );
};

export default HFNTab;

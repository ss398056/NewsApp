import React, { Component } from "react";
import PropTypes from "prop-types";
import {Link} from 'react-router-dom'

export default class Navbar extends Component {

  static propTypes = {
    prop: PropTypes,
  };
  constructor(){
    super();
    const url = new URL(window.location.href);
    this.state = {activeLink : url.pathname} 
  }

  handleNavClick = async (link) => {
    this.setState({activeLink : link});
  };

  render() {
    
    return (
      <>
        <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              NewsKing
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className={`nav-link ${this.state.activeLink==='/'?'active':''}`} aria-current="page" to="/" onClick={() => this.handleNavClick('/')}>
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${this.state.activeLink==='/business'?'active':''}`} to="/business" onClick={() => this.handleNavClick('/business')}>
                    Business
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${this.state.activeLink==='/entertainment'?'active':''}`} to="/entertainment" onClick={() => this.handleNavClick('/entertainment')}>
                    Entertainment
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${this.state.activeLink==='/technology'?'active':''}`} to="/technology" onClick={() => this.handleNavClick('/technology')} >
                    Technology
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${this.state.activeLink==='/health'?'active':''}`} to="/health" onClick={() => this.handleNavClick('/health')}>
                    Health
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${this.state.activeLink==='/science'?'active':''}`} to="/science" onClick={() => this.handleNavClick('/science')}>
                   Science
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className={`nav-link ${this.state.activeLink==='/sports'?'active':''}`} to="/sports" onClick={() => this.handleNavClick('/sports')}>
                    Sports
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </>
    );
  }
}

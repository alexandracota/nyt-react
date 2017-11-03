import React from "react";

var styles = {
  color: 'red',
  backgroundColor: 'black',
  fontSize: '60',
  padding: '25',
  textAlign: 'center'
};

const Nav = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div style={styles} className="navbar-header">
        <a href="/home" className="navbar-brand">
          New York Times Article Scraper
        </a>
      </div>
    </div>
  </nav>;

export default Nav;
import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <NavLink exact to="/Blockchain" className="nav-link">
              Home
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;

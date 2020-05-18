import React from "react";
import './HeaderNav.css';
import { NavLink }  from 'react-router-dom';


function Header() {
  return <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink activeClassName="btn-success" className="nav-item nav-link" to="/" exact>Home</NavLink>
      <NavLink activeClassName="btn-success" className="nav-item nav-link" to="/recipes">Recipes</NavLink>
      <NavLink activeClassName="btn-success" className="nav-item nav-link" to="/about">About</NavLink>
      <NavLink activeClassName="btn-success" className="nav-item nav-link" to="/administration">Admin</NavLink>
  </nav>;
}

export default Header;

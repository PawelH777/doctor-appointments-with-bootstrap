import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './NavBar.module.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const navBar = (props) => {
  return (
    <nav className={classes.fixed + " navbar-expand-lg navbar-light bg-light"} >
      <button className="btn btn-primary" id="menu-toggle" onClick={props.clicked}>Toggle Menu</button>
      <div className={classes.navbarListItemFixedPosition + " collapse navbar-collapse show"} id="navbarNavAltMarkup">
        <div className="navbar-nav ml-auto mt-2 mt-lg-0">
          <NavLink className="nav-item nav-link" to="/home" >Home</NavLink>
          { !props.isAuth
            ? (<Aux>
              <NavLink className="nav-item nav-link" to="/login" >Sign In</NavLink>
              <NavLink className="nav-item nav-link" to="/signup" >Sign Up</NavLink>
            </Aux>)
            : <NavLink className="nav-item nav-link" to="/logout" >Log Out</NavLink> }
        </div>
      </div>
    </nav>
  );
};

export default navBar;
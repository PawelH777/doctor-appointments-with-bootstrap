import React from 'react';

import { NavLink } from 'react-router-dom';
import './SideBar.module.css';

const sideBar = (props) => {
  return (
    <div className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">Reservations</div>
        <div className="list-group list-group-flush">
          <NavLink className="list-group-item list-group-item-action" to="/new">New Appointment</NavLink>
          { props.isAuth
            ? <NavLink className="list-group-item list-group-item-action" to="/appointments">Appointments</NavLink>
            : null }
        </div>
    </div>
  );
};

export default sideBar;
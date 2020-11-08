import React from 'react'

import { NavLink } from 'react-router-dom'
import './SideBar.module.css'
import Aux from '../../../hoc/Auxiliary/Auxiliary'

const sideBar = props => {
  return (
    <div className='border-right' id='sidebar-wrapper'>
      <div className='sidebar-heading'>Reservations</div>
      <div className='list-group list-group-flush'>
        {props.isAuth ? (
          <Aux>
            <NavLink
              className='list-group-item list-group-item-action'
              to='/appointments'
            >
              Appointments
            </NavLink>
            <NavLink
              className='list-group-item list-group-item-action'
              to='/new'
            >
              New Appointment
            </NavLink>
          </Aux>
        ) : null}
      </div>
    </div>
  )
}

export default sideBar

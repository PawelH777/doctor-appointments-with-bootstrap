import React from 'react'
import { NavLink } from 'react-router-dom'

import Divider from '@material-ui/core/Divider'

import Aux from '../../../../hoc/Auxiliary/Auxiliary'

const navBarForSmartphone = props => (
  <nav className={'navbar-expand-md navbar-dark bg-primary p-2'}>
    <div className='navbar-nav text-center w-100'>
      <NavLink className='nav-item nav-link w-100' to='/home'>
        Home
      </NavLink>
      {props.isAuth ? (
        <Aux>
          <NavLink className='nav-item nav-link' to='/appointments'>
            Appointments
          </NavLink>
          <NavLink className='nav-item nav-link' to='/scheduler'>
            New Appointment
          </NavLink>
          <Divider orientation='vertical' flexItem />
          <NavLink className='nav-item nav-link' to='/logout'>
            Log Out
          </NavLink>
        </Aux>
      ) : (
        <Aux>
          <NavLink className='nav-item nav-link' to='/login'>
            Sign In
          </NavLink>
          <NavLink className='nav-item nav-link' to='/signup'>
            Sign Up
          </NavLink>
        </Aux>
      )}
      <NavLink className='nav-item nav-link' to='/contact'>
        Contact
      </NavLink>
    </div>
  </nav>
)

export default navBarForSmartphone

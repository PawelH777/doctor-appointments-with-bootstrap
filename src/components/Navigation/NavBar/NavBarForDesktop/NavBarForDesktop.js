import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineHome } from 'react-icons/ai'

import Divider from '@material-ui/core/Divider'

import classes from './NavBarForDesktop.module.css'
import Aux from '../../../../hoc/Auxiliary/Auxiliary'

const navBarForDesktop = props => (
  <nav className={classes.fixed + ' navbar-expand-md navbar-dark bg-primary'}>
    <div className='navbar-nav mr-auto mt-lg-0'>
      <NavLink className='nav-item nav-link' to='/home'>
        <AiOutlineHome size='2em' />
      </NavLink>
    </div>
    <div className='navbar-nav ml-auto mt-lg-0'>
      {props.isAuth ? (
        <Aux>
          <NavLink className='nav-item nav-link' to='/appointments'>
            Appointments
          </NavLink>
          <NavLink className='nav-item nav-link' to='/new'>
            New Appointment
          </NavLink>
          <Divider orientation='vertical' flexItem light={true} />
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
    </div>
  </nav>
)

export default navBarForDesktop

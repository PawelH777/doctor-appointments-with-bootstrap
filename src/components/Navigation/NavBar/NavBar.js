import React from 'react'
import { useMediaQuery } from 'react-responsive'
import NavBarForDesktop from './NavBarForDesktop/NavBarForDesktop'
import NavBarForSmartphone from './NavBarForSmartphone/NavBarForSmartphone'

const NavBar = props => {
  const isPhoneViewport = useMediaQuery({
    query: '(max-width: 768px)'
  })
  return isPhoneViewport ? (
    <NavBarForSmartphone isAuth={props.isAuth} />
  ) : (
    <NavBarForDesktop isAuth={props.isAuth} />
  )
}

export default NavBar

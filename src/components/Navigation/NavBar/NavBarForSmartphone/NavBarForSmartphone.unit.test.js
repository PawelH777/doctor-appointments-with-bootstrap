import React from 'react'
import { NavLink } from 'react-router-dom'
import Divider from '@material-ui/core/Divider'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavBarForSmartphone from './NavBarForSmartphone'

configure({ adapter: new Adapter() })

describe('<NavBarForSmartphone /> unit tests', () => {
  it('should render nav bar for smartphone for unauthenticated user', () => {
    // given

    // when
    const wrapper = shallow(<NavBarForSmartphone isAuth={false} />)

    // then
    const actualNavLinks = wrapper.find(NavLink)
    expect(actualNavLinks).toHaveLength(4)

    const directions = []
    actualNavLinks.forEach(navLink => {
      directions.push(navLink.prop('to'))
    })
    expect(directions).toContain('/home')
    expect(directions).toContain('/login')
    expect(directions).toContain('/signup')
    expect(directions).toContain('/contact')
  })

  it('should render nav bar for smartphone for authenticated user', () => {
    // given

    // when
    const wrapper = shallow(<NavBarForSmartphone isAuth={true} />)

    // then
    expect(wrapper.find(Divider)).toHaveLength(1)

    const actualNavLinks = wrapper.find(NavLink)
    expect(actualNavLinks).toHaveLength(5)

    const directions = []
    actualNavLinks.forEach(navLink => {
      directions.push(navLink.prop('to'))
    })
    expect(directions).toContain('/home')
    expect(directions).toContain('/appointments')
    expect(directions).toContain('/scheduler')
    expect(directions).toContain('/logout')
    expect(directions).toContain('/contact')
  })
})

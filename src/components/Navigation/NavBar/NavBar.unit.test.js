import React from 'react'
import { Context as ResponsiveContext } from 'react-responsive'
import { MemoryRouter as Router } from 'react-router-dom'

import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NavBar from './NavBar'
import NavBarForDesktop from './NavBarForDesktop/NavBarForDesktop'
import NavBarForSmartphone from './NavBarForSmartphone/NavBarForSmartphone'

configure({ adapter: new Adapter() })

describe('<NavBar /> unit tests', () => {
  it('should render nav bar for desktop', () => {
    // given
    const wrappingComponent = ResponsiveContext.Provider
    const wrappingComponentProps = { value: { width: 769 } }
    const mountProps = { wrappingComponent, wrappingComponentProps }

    // when
    const wrapper = mount(
      <Router>
        <NavBar isAuth={true} />
      </Router>,
      mountProps
    )

    // then
    const actualNavBar = wrapper.find(NavBarForDesktop)
    expect(actualNavBar).toBeDefined()
    expect(actualNavBar.prop('isAuth')).toBe(true)
  })

  it('should render nav bar for smartphone', () => {
    // given
    const wrappingComponent = ResponsiveContext.Provider
    const wrappingComponentProps = { value: { width: 767 } }
    const mountProps = { wrappingComponent, wrappingComponentProps }

    // when
    const wrapper = mount(
      <Router>
        <NavBar isAuth={false} />
      </Router>,
      mountProps
    )

    // then
    const actualNavBar = wrapper.find(NavBarForSmartphone)
    expect(actualNavBar).toBeDefined()
    expect(actualNavBar.prop('isAuth')).toBe(false)
  })
})

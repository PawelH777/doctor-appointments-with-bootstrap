import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Layout from './Layout'
import Content from '../Content/Content'
import NavBar from '../../components/Navigation/NavBar/NavBar'

configure({ adapter: new Adapter() })

const configureMockStore = configureStore()

const initialState = {
  auth: {
    token: 'test token'
  }
}

const store = configureMockStore(initialState)

describe('<Content /> unit tests', () => {
  it('should render layout component', () => {
    // given

    // when
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Layout />
        </Router>
      </Provider>
    )

    // then
    const actualNavBar = wrapper.find(NavBar)
    expect(actualNavBar).toHaveLength(1)
    expect(actualNavBar.prop('isAuth')).toBe(true)

    const actualContent = wrapper.find(Content)
    expect(actualContent).toHaveLength(1)
    expect(actualContent.prop('isAuth')).toBe(true)
  })
})

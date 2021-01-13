import React from 'react'
import { Provider } from 'react-redux'
import {
  Route,
  Switch,
  Redirect,
  MemoryRouter as Router
} from 'react-router-dom'
import configureStore from 'redux-mock-store'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Content from './Content'

configure({ adapter: new Adapter() })

const configureMockStore = configureStore()

const initialState = {
  auth: {
    token: 'test token'
  }
}

const store = configureMockStore(initialState)

const EXPECTED_START_PATH = '/'

describe('<Content /> unit tests', () => {
  it('should render content component', () => {
    // given

    // when
    const wrapper = mount(
      <Provider store={store}>
        <Router>
          <Content isAuth={true} />
        </Router>
      </Provider>
    )

    // then
    const actualSwitch = wrapper.find(Switch)
    expect(actualSwitch).toHaveLength(1)

    const actualRoute = actualSwitch.find(Route)
    expect(actualRoute).toHaveLength(1)
    expect(actualRoute.prop('path')).toBe(EXPECTED_START_PATH)
  })
})

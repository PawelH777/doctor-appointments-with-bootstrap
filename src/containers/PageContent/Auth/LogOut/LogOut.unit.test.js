import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter as Router } from 'react-router-dom'

import LogOut from './LogOut'

configure({ adapter: new Adapter() })

const configureMockStore = configureStore()

const initialState = {}
const store = configureMockStore(initialState)

describe('<Log out /> unit tests', () => {
  it('should redirect to /', async () => {
    // given
    store.dispatch = jest.fn()

    // when
    const wrapper = mount(
      <Router>
        <Provider store={store}>
          <LogOut />
        </Provider>
      </Router>
    )
    await wrapper.update()
    wrapper.update()

    // then
    expect(store.dispatch).toHaveBeenCalledTimes(1)

    const actualRedirectElement = wrapper.find(Redirect)
    expect(actualRedirectElement).toHaveLength(1)
    expect(actualRedirectElement.prop('to')).toBe('/')
  })
})

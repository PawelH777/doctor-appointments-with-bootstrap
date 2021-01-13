import React from 'react'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Start from './Start'

configure({ adapter: new Adapter() })

const configureMockStore = configureStore()

jest.mock('../../../axios-doctor-appointments')

const EXPECTED_PATH_TO_REDIRECT_WHEN_USER_IS_AUTH = '/scheduler'
const EXPECTED_PATH_TO_REDIRECT_WHEN_USER_IS_NOT_AUTH = '/login'
const EXPECTED_BUTTON_LABEL_WHEN_USER_IS_AUTH = 'SCHEDULE THE MEETING'
const EXPECTED_BUTTON_LABEL_WHEN_USER_IS_NOT_AUTH = 'LOG IN'

describe('<Start /> unit tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render start page when user is authenticated', () => {
    // given
    const mockedPushMethod = jest.fn()
    const initialProps = {
      history: {
        push: mockedPushMethod
      }
    }

    const initialState = {
      auth: {
        token: 'test token'
      }
    }

    const store = configureMockStore(initialState)

    // when
    const wrapper = mount(
      <Provider store={store}>
        <Start {...initialProps} />
      </Provider>
    )
    wrapper.find('button').simulate('click')

    // then
    const actualButton = wrapper.find('button')
    expect(actualButton).toHaveLength(1)
    expect(actualButton.prop('onClick')).toBeDefined()
    expect(actualButton.text()).toBe(EXPECTED_BUTTON_LABEL_WHEN_USER_IS_AUTH)

    expect(mockedPushMethod).toHaveBeenCalledTimes(1)
    expect(mockedPushMethod).toBeCalledWith(
      EXPECTED_PATH_TO_REDIRECT_WHEN_USER_IS_AUTH
    )
  })

  it('should render start page when user is not authenticated', () => {
    // given
    const mockedPushMethod = jest.fn()
    const initialProps = {
      history: {
        push: mockedPushMethod
      }
    }

    const initialState = {
      auth: {
        token: null
      }
    }

    const store = configureMockStore(initialState)

    // when
    const wrapper = mount(
      <Provider store={store}>
        <Start {...initialProps} />
      </Provider>
    )
    wrapper.find('button').simulate('click')

    // then
    const actualButton = wrapper.find('button')
    expect(actualButton).toHaveLength(1)
    expect(actualButton.prop('onClick')).toBeDefined()
    expect(actualButton.text()).toBe(
      EXPECTED_BUTTON_LABEL_WHEN_USER_IS_NOT_AUTH
    )

    expect(mockedPushMethod).toHaveBeenCalledTimes(1)
    expect(mockedPushMethod).toBeCalledWith(
      EXPECTED_PATH_TO_REDIRECT_WHEN_USER_IS_NOT_AUTH
    )
  })
})

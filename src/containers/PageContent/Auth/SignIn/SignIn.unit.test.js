import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import { MemoryRouter as Router } from 'react-router-dom'

import SignIn from './SignIn'
import FormWithShadow from '../../../../components/FormWithShadow/FormWithShadow'
import { EmailDataModel } from '../../../../data/inputsDataModels/EmailDataModel'
import { PasswordDataModel } from '../../../../data/inputsDataModels/PasswordDataModel'

configure({ adapter: new Adapter() })

const configureMockStore = configureStore()

const initialState = {}
const store = configureMockStore(initialState)

describe('<SignIn /> unit tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should render SignIn component', () => {
    // given
    store.dispatch = jest.fn()

    // when
    const wrapper = mount(
      <Router>
        <Provider store={store}>
          <SignIn />
        </Provider>
      </Router>
    )

    // then
    expect(store.dispatch).toHaveBeenCalledTimes(0)

    const actualFormWithShadowElement = wrapper.find(FormWithShadow)
    expect(actualFormWithShadowElement).toHaveLength(1)

    const actualInputsFromProp = actualFormWithShadowElement.prop('inputs')
    expect(actualInputsFromProp.email).toMatchObject(new EmailDataModel())
    expect(actualInputsFromProp.password).toMatchObject(
      new PasswordDataModel(false)
    )
    expect(actualFormWithShadowElement.prop('submitted')).toBeDefined()
  })

  it('should sign in method be performed correctly', async () => {
    // given
    store.dispatch = jest.fn().mockImplementation(() => Promise.resolve())

    const mockedGoBackMethod = jest.fn()
    const initialProps = {
      history: {
        goBack: mockedGoBackMethod
      }
    }

    const submitMethodArguments = {
      email: {
        attributes: {
          value: 'Email test value'
        }
      },
      password: {
        attributes: {
          value: 'Password test value'
        }
      }
    }

    // when
    const wrapper = mount(
      <Router>
        <Provider store={store}>
          <SignIn {...initialProps} />
        </Provider>
      </Router>
    )
    await wrapper
      .find(FormWithShadow)
      .props()
      .submitted(submitMethodArguments)

    // then
    expect(store.dispatch).toHaveBeenCalledTimes(1)
    expect(mockedGoBackMethod).toHaveBeenCalledTimes(1)
  })
})

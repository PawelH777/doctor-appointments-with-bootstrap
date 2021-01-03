import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'

import AppointmentDetails from './PatientInformation'
import FormWithShadow from '../../../components/FormWithShadow/FormWithShadow'
import { NameDataModel } from '../../../data/stateDataModels/NameDataModel'
import { LastNameDataModel } from '../../../data/stateDataModels/LastNameDataModel'
import { EmailDataModel } from '../../../data/stateDataModels/EmailDataModel'
import { NumberDataModel } from '../../../data/stateDataModels/NumberDataModel'
import axios from '../../../axios-doctor-appointments'

configure({ adapter: new Adapter() })

const configureMockStore = configureStore()

const initialState = {
  auth: {
    token: 'test-token',
    userId: 'test-user-id'
  }
}
const store = configureMockStore(initialState)

jest.mock('../../../../axios-doctor-appointments')

describe('<AppointmentDetails /> unit tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render AppointmentDetails component', () => {
    // given

    // when
    const wrapper = mount(
      <Provider store={store}>
        <AppointmentDetails />
      </Provider>
    )

    // then
    const actualFormWithShadow = wrapper.find(FormWithShadow)
    expect(actualFormWithShadow).toHaveLength(1)

    const actualInputs = actualFormWithShadow.prop('inputs')
    expect(actualInputs).toBeDefined()
    expect(actualInputs.name).toMatchObject(new NameDataModel())
    expect(actualInputs.lastName).toMatchObject(new LastNameDataModel())
    expect(actualInputs.email).toMatchObject(new EmailDataModel())
    expect(actualInputs.number).toMatchObject(new NumberDataModel())

    expect(actualFormWithShadow.prop('submitted')).toBeDefined()
  })

  it('should save appointment method be performed correctly, without errors', async () => {
    // given
    axios.post.mockImplementation(() => Promise.resolve())

    const mockedPushMethod = jest.fn()
    const initialProps = {
      history: {
        push: mockedPushMethod,
        location: {
          state: {
            dates: ['Test date 1', 'Test date 2']
          }
        }
      }
    }

    const submitMethodArguments = {
      name: {
        attributes: {
          value: 'Name test value'
        }
      },
      lastName: {
        attributes: {
          value: 'LastName test value'
        }
      },
      email: {
        attributes: {
          value: 'Email test value'
        }
      },
      number: {
        attributes: {
          value: 'Number test value'
        }
      }
    }

    // when
    const wrapper = mount(
      <Router>
        <Provider store={store}>
          <AppointmentDetails {...initialProps} />
        </Provider>
      </Router>
    )
    await wrapper
      .find(FormWithShadow)
      .props()
      .submitted(submitMethodArguments)

    // then
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toBeCalledWith('/appointments.json?auth=test-token', {
      userId: 'test-user-id',
      selectedDates: ['Test date 1', 'Test date 2'],
      personalInfo: {
        name: 'Name test value',
        lastName: 'LastName test value',
        email: 'Email test value',
        number: 'Number test value'
      }
    })

    expect(mockedPushMethod).toHaveBeenCalledTimes(1)
    expect(mockedPushMethod).toBeCalledWith('/')
  })

  it('should save appointment method be performed correctly but with error', async () => {
    // given
    console.log = jest.fn()

    axios.post.mockImplementation(() => Promise.reject('400 Error'))

    const mockedPushMethod = jest.fn()
    const initialProps = {
      history: {
        push: mockedPushMethod,
        location: {
          state: {
            dates: []
          }
        }
      }
    }

    const submitMethodArguments = {
      name: {
        attributes: {
          value: 'Name test value'
        }
      },
      lastName: {
        attributes: {
          value: 'LastName test value'
        }
      },
      email: {
        attributes: {
          value: 'Email test value'
        }
      },
      number: {
        attributes: {
          value: 'Number test value'
        }
      }
    }

    // when
    const wrapper = mount(
      <Router>
        <Provider store={store}>
          <AppointmentDetails {...initialProps} />
        </Provider>
      </Router>
    )
    await wrapper
      .find(FormWithShadow)
      .props()
      .submitted(submitMethodArguments)

    // then
    expect(axios.post).toHaveBeenCalledTimes(1)
    expect(axios.post).toBeCalledWith('/appointments.json?auth=test-token', {
      userId: 'test-user-id',
      selectedDates: [],
      personalInfo: {
        name: 'Name test value',
        lastName: 'LastName test value',
        email: 'Email test value',
        number: 'Number test value'
      }
    })

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toBeCalledWith('400 Error')

    expect(mockedPushMethod).toHaveBeenCalledTimes(1)
    expect(mockedPushMethod).toBeCalledWith('/')
  })
})

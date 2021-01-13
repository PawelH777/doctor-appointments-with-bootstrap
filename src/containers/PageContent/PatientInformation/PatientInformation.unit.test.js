import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import { MemoryRouter as Router } from 'react-router-dom'

import AppointmentDetails from './PatientInformation'
import FormWithShadow from '../../../components/FormWithShadow/FormWithShadow'
import { NameDataModel } from '../../../data/inputsDataModels/NameDataModel'
import { LastNameDataModel } from '../../../data/inputsDataModels/LastNameDataModel'
import { EmailDataModel } from '../../../data/inputsDataModels/EmailDataModel'
import { NumberDataModel } from '../../../data/inputsDataModels/NumberDataModel'
import { AppointmentReservation } from '../../../data/dataStructures/AppointmentReservation'
import { Appointment } from '../../../data/dataStructures/Appointment'
import { PatientInfo } from '../../../data/dataStructures/PatientInfo'
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

jest.mock('../../../axios-doctor-appointments')

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

    let currentDate = new Date(new Date().setHours(10))
    const dateInLocalDateFormat = currentDate.toLocaleDateString()

    const expectedFirstReservation = new Appointment()
    expectedFirstReservation.setId(1 + dateInLocalDateFormat)
    expectedFirstReservation.setHour(currentDate.getHours())
    expectedFirstReservation.setDay(currentDate.getDate())
    expectedFirstReservation.setMonth(currentDate.getMonth())
    expectedFirstReservation.setYear(currentDate.getFullYear())
    expectedFirstReservation.setDate(dateInLocalDateFormat)
    expectedFirstReservation.setIsReserved(true)

    currentDate = new Date(new Date().setHours(11))
    const expectedSecondReservation = new Appointment()
    expectedSecondReservation.setId(2 + dateInLocalDateFormat)
    expectedSecondReservation.setHour(currentDate.getHours())
    expectedSecondReservation.setDay(currentDate.getDate())
    expectedSecondReservation.setMonth(currentDate.getMonth())
    expectedSecondReservation.setYear(currentDate.getFullYear())
    expectedSecondReservation.setDate(dateInLocalDateFormat)
    expectedSecondReservation.setIsReserved(true)

    const mockedPushMethod = jest.fn()
    const initialProps = {
      history: {
        push: mockedPushMethod,
        location: {
          state: {
            reservedAppointments: [
              expectedFirstReservation,
              expectedSecondReservation
            ]
          }
        }
      }
    }

    const expectedNameValue = 'Name test value'
    const expectedLastNameValue = 'LastName test value'
    const expectedEmailValue = 'Email test value'
    const expectedNumberValue = 'Number test value'
    const submitMethodArguments = {
      name: {
        attributes: {
          value: expectedNameValue
        }
      },
      lastName: {
        attributes: {
          value: expectedLastNameValue
        }
      },
      email: {
        attributes: {
          value: expectedEmailValue
        }
      },
      number: {
        attributes: {
          value: expectedNumberValue
        }
      }
    }

    const expectedPatientInfo = new PatientInfo()
    expectedPatientInfo.setName(expectedNameValue)
    expectedPatientInfo.setLastName(expectedLastNameValue)
    expectedPatientInfo.setEmail(expectedEmailValue)
    expectedPatientInfo.setNumber(expectedNumberValue)

    const expectedPassedAppointmentReservation = new AppointmentReservation()
    expectedPassedAppointmentReservation.setUserId('test-user-id')
    expectedPassedAppointmentReservation.setPatientInformation(
      expectedPatientInfo
    )
    expectedPassedAppointmentReservation.setReservedAppointments([
      expectedFirstReservation,
      expectedSecondReservation
    ])

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
    expect(axios.post).toBeCalledWith(
      '/appointments.json?auth=test-token',
      expectedPassedAppointmentReservation
    )

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
            reservedAppointments: []
          }
        }
      }
    }

    const expectedNameValue = 'Name test value'
    const expectedLastNameValue = 'LastName test value'
    const expectedEmailValue = 'Email test value'
    const expectedNumberValue = 'Number test value'
    const submitMethodArguments = {
      name: {
        attributes: {
          value: expectedNameValue
        }
      },
      lastName: {
        attributes: {
          value: expectedLastNameValue
        }
      },
      email: {
        attributes: {
          value: expectedEmailValue
        }
      },
      number: {
        attributes: {
          value: expectedNumberValue
        }
      }
    }

    const expectedPatientInfo = new PatientInfo()
    expectedPatientInfo.setName(expectedNameValue)
    expectedPatientInfo.setLastName(expectedLastNameValue)
    expectedPatientInfo.setEmail(expectedEmailValue)
    expectedPatientInfo.setNumber(expectedNumberValue)

    const expectedPassedAppointmentReservation = new AppointmentReservation()
    expectedPassedAppointmentReservation.setUserId('test-user-id')
    expectedPassedAppointmentReservation.setPatientInformation(
      expectedPatientInfo
    )
    expectedPassedAppointmentReservation.setReservedAppointments([])

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
    expect(axios.post).toBeCalledWith(
      '/appointments.json?auth=test-token',
      expectedPassedAppointmentReservation
    )

    expect(console.log).toHaveBeenCalledTimes(1)
    expect(console.log).toBeCalledWith('400 Error')

    expect(mockedPushMethod).toHaveBeenCalledTimes(1)
    expect(mockedPushMethod).toBeCalledWith('/')
  })
})

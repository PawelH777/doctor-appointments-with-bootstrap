import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store'

import axios from '../../../axios-doctor-appointments'
import Appointments from './Appointments'
import AppointmentCard from '../../../components/AppointmentCard/AppointmentCard'
import Appointment from '../../../components/Appointment/Appointment'
import {
  INTERNAL_MEDICINE_CONSULTATION,
  FAMILY_DOCTOR_CONSULTATION,
  ONLINE_CONSULTATION
} from '../../../data/constants/AppointmentCausesConstants'

configure({ adapter: new Adapter() })

const configureMockStore = configureStore()

const initialState = {
  auth: {
    userId: 1,
    token: 'test token'
  }
}

const store = configureMockStore(initialState)

jest.mock('../../../axios-doctor-appointments')

const PERSONAL_INFO = {
  email: 'pawel.jan.hornik@gmail.com',
  lastName: 'Hornik',
  name: 'Paweł',
  number: '640645719'
}

const currentDatePlusOneDay = new Date(
  new Date().setDate(new Date().getDate() + 1)
)

const currentDatePlusOneMonth = new Date(
  new Date().setDate(new Date().getDate() + 30)
)
const currentDateMinusOneDay = new Date(
  new Date().setDate(new Date().getDate() - 1)
)

const FIRST_RESERVED_DATE = {
  date: currentDatePlusOneDay.toLocaleDateString(),
  day: currentDatePlusOneDay.getDate(),
  hour: 10,
  id: '1' + currentDatePlusOneDay.toLocaleDateString(),
  isReserved: true,
  month: currentDatePlusOneDay.getMonth(),
  selectedAppointmentCause: INTERNAL_MEDICINE_CONSULTATION,
  year: currentDatePlusOneDay.getFullYear()
}

const SECOND_RESERVED_DATE = {
  date: currentDatePlusOneDay.toLocaleDateString(),
  day: currentDatePlusOneDay.getDate(),
  hour: 11,
  id: '1' + currentDatePlusOneDay.toLocaleDateString(),
  isReserved: true,
  month: currentDatePlusOneDay.getMonth(),
  selectedAppointmentCause: FAMILY_DOCTOR_CONSULTATION,
  year: currentDatePlusOneDay.getFullYear()
}

const THIRD_RESERVED_DATE = {
  date: currentDatePlusOneMonth.toLocaleDateString(),
  day: currentDatePlusOneMonth.getDate(),
  hour: 10,
  id: '2' + currentDatePlusOneMonth.toLocaleDateString(),
  isReserved: true,
  month: currentDatePlusOneMonth.getMonth(),
  selectedAppointmentCause: ONLINE_CONSULTATION,
  year: currentDatePlusOneMonth.getFullYear()
}

const FOURTH_RESERVED_DATE = {
  date: currentDateMinusOneDay.toLocaleDateString(),
  day: currentDateMinusOneDay.getDate(),
  hour: 10,
  id: '1' + currentDateMinusOneDay.toLocaleDateString(),
  isReserved: true,
  month: currentDateMinusOneDay.getMonth(),
  selectedAppointmentCause: INTERNAL_MEDICINE_CONSULTATION,
  year: currentDateMinusOneDay.getFullYear()
}

const FIFTH_RESERVED_DATE = {
  date: currentDateMinusOneDay.toLocaleDateString(),
  day: currentDateMinusOneDay.getDate(),
  hour: 11,
  id: '1' + currentDateMinusOneDay.toLocaleDateString(),
  isReserved: true,
  month: currentDateMinusOneDay.getMonth(),
  selectedAppointmentCause: INTERNAL_MEDICINE_CONSULTATION,
  year: currentDateMinusOneDay.getFullYear()
}

describe('<Appointments /> unit tests', () => {
  it('should render appointments', async () => {
    // given
    const mockResponse = {
      data: {
        first: {
          personalInfo: PERSONAL_INFO,
          selectedDates: {
            0: FIRST_RESERVED_DATE
          }
        },
        second: {
          personalInfo: PERSONAL_INFO,
          selectedDates: {
            0: SECOND_RESERVED_DATE,
            1: THIRD_RESERVED_DATE
          }
        }
      }
    }
    axios.get.mockImplementation(() => Promise.resolve(mockResponse))
    const expectedFirstAppointmentId = 'first'
    const expectedSecondAppointmentId = 'second'

    // when
    const wrapper = mount(<Appointments store={store} />)
    await wrapper.update()
    wrapper.update()

    // then
    const actualAppointmentCardElement = wrapper.find(AppointmentCard)
    expect(actualAppointmentCardElement).toHaveLength(2)

    // First Appointment Card
    const actualFirstAppointmentCardElement = actualAppointmentCardElement.filterWhere(
      appointmentCard =>
        appointmentCard.prop('appointmentId') === expectedFirstAppointmentId
    )
    expect(actualFirstAppointmentCardElement).toHaveLength(1)
    expect(actualFirstAppointmentCardElement.prop('appointmentId')).toBe(
      expectedFirstAppointmentId
    )
    expect(actualFirstAppointmentCardElement.prop('info')).toBe(PERSONAL_INFO)
    expect(actualFirstAppointmentCardElement.prop('dates')).toBeDefined()
    expect(
      actualFirstAppointmentCardElement.prop('removeReservation')
    ).toBeDefined()

    // First Appointment from first Appointment Card
    const actualFirstAppointmentFromFirstCardElement = actualFirstAppointmentCardElement.find(
      Appointment
    )
    expect(actualFirstAppointmentFromFirstCardElement).toHaveLength(1)
    expect(actualFirstAppointmentFromFirstCardElement.prop('editMode')).toBe(
      false
    )
    expect(
      actualFirstAppointmentFromFirstCardElement.prop(
        'selectedAppointmentCause'
      )
    ).toBe(INTERNAL_MEDICINE_CONSULTATION)
    expect(
      actualFirstAppointmentFromFirstCardElement.prop('appointmentTerm')
    ).toBeDefined()

    // Second Appointment Card
    const actualSecondAppointmentCardElement = actualAppointmentCardElement.filterWhere(
      appointmentCard =>
        appointmentCard.prop('appointmentId') === expectedSecondAppointmentId
    )
    expect(actualSecondAppointmentCardElement).toHaveLength(1)
    expect(actualSecondAppointmentCardElement.prop('appointmentId')).toBe(
      expectedSecondAppointmentId
    )
    expect(actualSecondAppointmentCardElement.prop('info')).toBe(PERSONAL_INFO)
    expect(actualSecondAppointmentCardElement.prop('dates')).toBeDefined()
    expect(
      actualSecondAppointmentCardElement.prop('removeReservation')
    ).toBeDefined()

    // Appointments from second Appointment Card
    const actualAppointmentsFromSecondCardElement = actualSecondAppointmentCardElement.find(
      Appointment
    )
    expect(actualAppointmentsFromSecondCardElement).toHaveLength(2)
    const actualSelectedCausesFromSecondCard = []
    // Only selected appointment cause should be checked as the rest of the properties are the same as in case of the first appointment
    actualAppointmentsFromSecondCardElement.forEach(appointmentElement =>
      actualSelectedCausesFromSecondCard.push(
        appointmentElement.prop('selectedAppointmentCause')
      )
    )
    expect(actualSelectedCausesFromSecondCard).toContain(
      FAMILY_DOCTOR_CONSULTATION
    )
    expect(actualSelectedCausesFromSecondCard).toContain(ONLINE_CONSULTATION)
  })

  it('should render placeholder text because reserved dates are outdated', async () => {
    // given
    const mockResponse = {
      data: {
        first: {
          personalInfo: PERSONAL_INFO,
          selectedDates: {
            0: FOURTH_RESERVED_DATE
          }
        },
        second: {
          personalInfo: PERSONAL_INFO,
          selectedDates: {
            0: FIFTH_RESERVED_DATE
          }
        }
      }
    }
    axios.get.mockImplementation(() => Promise.resolve(mockResponse))

    // when
    const wrapper = mount(<Appointments store={store} />)
    await wrapper.update()
    wrapper.update()

    // then
    const actualAppointmentCardElement = wrapper.find(AppointmentCard)
    expect(actualAppointmentCardElement).toHaveLength(0)

    expect(wrapper.text()).toBe(
      'No appointments! Please make a new one to view it there.'
    )
  })

  it('should render spinner as the async code is not finished', async () => {
    // given
    const mockResponse = {
      data: {
        first: {
          personalInfo: PERSONAL_INFO,
          selectedDates: {
            0: FOURTH_RESERVED_DATE
          }
        },
        second: {
          personalInfo: PERSONAL_INFO,
          selectedDates: {
            0: FIFTH_RESERVED_DATE
          }
        }
      }
    }
    axios.get.mockImplementation(() => Promise.resolve(mockResponse))

    // when
    const wrapper = mount(<Appointments store={store} />)
    wrapper.update() // component contains async code that'll be executed after the assertions

    // then
    expect(wrapper.text()).toBe('Loading...')
  })

  it('should remove appointments', async () => {
    // given
    const mockResponse = {
      data: {
        first: {
          personalInfo: PERSONAL_INFO,
          selectedDates: {
            0: FIRST_RESERVED_DATE
          }
        },
        second: {
          personalInfo: PERSONAL_INFO,
          selectedDates: {
            0: SECOND_RESERVED_DATE,
            1: THIRD_RESERVED_DATE
          }
        }
      }
    }
    axios.get.mockImplementation(() => Promise.resolve(mockResponse))
    axios.delete.mockImplementation(() => Promise.resolve())

    // when
    const wrapper = mount(<Appointments store={store} />)
    await wrapper.update()
    wrapper.update()
    expect(wrapper.find(AppointmentCard)).toHaveLength(2)

    await wrapper
      .find(AppointmentCard)
      .filterWhere(
        appointmentCard => appointmentCard.prop('appointmentId') === 'first'
      )
      .find('button')
      .simulate('click')

    await wrapper
      .find(AppointmentCard)
      .filterWhere(
        appointmentCard => appointmentCard.prop('appointmentId') === 'second'
      )
      .find('button')
      .simulate('click')
    wrapper.update()

    // then
    expect(wrapper.find(AppointmentCard)).toHaveLength(0)
    expect(wrapper.text()).toBe(
      'No appointments! Please make a new one to view it there.'
    )
  })
})

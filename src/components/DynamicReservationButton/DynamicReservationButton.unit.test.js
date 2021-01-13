import React from 'react'
import { MemoryRouter as Router } from 'react-router-dom'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import DynamicReservationButton from './DynamicReservationButton'
import { Appointment } from '../../data/dataStructures/Appointment'

configure({ adapter: new Adapter() })

describe('<DynamicReservationButton /> unit tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should render DynamicReservationButton with authentication', () => {
    // given
    const expectedReservedAppointment = new Appointment()
    const expectedReservedAppointments = [
      expectedReservedAppointment,
      expectedReservedAppointment
    ]

    // when
    const wrapper = mount(
      <Router>
        <DynamicReservationButton
          isAuthenticated={true}
          reservedAppointments={expectedReservedAppointments}
        />
      </Router>
    )

    // then
    const actualButton = wrapper.find('button')
    expect(actualButton).toHaveLength(1)
    expect(actualButton.text()).toBe('PROCEED')
  })

  it('should render DynamicReservationButton without authentication', () => {
    // given

    // when
    const wrapper = mount(
      <Router>
        <DynamicReservationButton isAuthenticated={false} />
      </Router>
    )

    // then
    const actualButton = wrapper.find('button')
    expect(actualButton).toHaveLength(1)
    expect(actualButton.text()).toBe('PLEASE SIGN IN')
  })
})

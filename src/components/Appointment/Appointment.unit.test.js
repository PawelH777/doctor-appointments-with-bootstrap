import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Appointment from './Appointment'
import Selector from '../Selector/Selector'

configure({ adapter: new Adapter() })

describe('<Appointment /> unit tests', () => {
  it('should render appointment in edit mode', () => {
    // given
    const expectedCauses = [
      'test appointment cause',
      'test appointment cause 2'
    ]
    const expectedSelectedCause = 'test appointment cause'

    // when
    const wrapper = shallow(
      <Appointment
        editMode={true}
        appointmentCauses={expectedCauses}
        selectedAppointmentCause={expectedSelectedCause}
      />
    )

    // then
    const selector = wrapper.find(Selector)
    expect(selector).toBeDefined()

    const actualCauses = selector.prop('appointmentCauses')
    expect(actualCauses).toBe(expectedCauses)

    const actualSelectedCause = selector.prop('selectedAppointmentCause')
    expect(actualSelectedCause).toBe(expectedSelectedCause)

    expect(wrapper.find('button')).toBeDefined()
  })

  it('should render appointment in read mode', () => {
    // given
    const expectedSelectedCause = 'test appointment cause'

    // when
    const wrapper = shallow(
      <Appointment
        editMode={false}
        selectedAppointmentCause={expectedSelectedCause}
      />
    )

    // then
    const actualLabel = wrapper.find('label')
    expect(actualLabel).toBeDefined()
    expect(actualLabel.prop('htmlFor')).toBe('cause')

    const actualH6 = wrapper.find('h6')
    expect(actualH6.text()).toBe(expectedSelectedCause)
  })
})

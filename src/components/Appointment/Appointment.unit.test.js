import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Appointment from './Appointment'
import Selector from '../Selector/Selector'

configure({ adapter: new Adapter() })

const EXPECTED_CAUSES = ['test appointment cause', 'test appointment cause 2']
const EXPECTED_SELECTED_CAUSE = 'test appointment cause'

describe('<Appointment /> unit tests', () => {
  it('should render appointment in edit mode', () => {
    // given

    // when
    const wrapper = shallow(
      <Appointment
        editMode={true}
        appointmentCauses={EXPECTED_CAUSES}
        selectedAppointmentCause={EXPECTED_SELECTED_CAUSE}
      />
    )

    // then
    const selector = wrapper.find(Selector)
    expect(selector).toBeDefined()

    const actualCauses = selector.prop('appointmentCauses')
    expect(actualCauses).toBe(EXPECTED_CAUSES)

    const actualSelectedCause = selector.prop('selectedAppointmentCause')
    expect(actualSelectedCause).toBe(EXPECTED_SELECTED_CAUSE)

    expect(wrapper.find('button')).toBeDefined()
  })

  it('should render appointment in read mode', () => {
    // given

    // when
    const wrapper = shallow(
      <Appointment
        editMode={false}
        selectedAppointmentCause={EXPECTED_SELECTED_CAUSE}
      />
    )

    // then
    const actualLabel = wrapper.find('label')
    expect(actualLabel).toBeDefined()
    expect(actualLabel.prop('htmlFor')).toBe('cause')

    const actualH6 = wrapper.find('h6')
    expect(actualH6.text()).toBe(EXPECTED_SELECTED_CAUSE)
  })
})

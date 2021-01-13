import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'

import Selector from './Selector'

configure({ adapter: new Adapter() })

const EXPECTED_SELECTED_CAUSE = 'Test cause 1'
const EXPECTED_SECOND_CAUSE = 'Test cause 2'
const EXPECTED_CAUSES = [EXPECTED_SELECTED_CAUSE, EXPECTED_SECOND_CAUSE]

describe('<Selector /> unit tests', () => {
  it('should render active selector with two choices', () => {
    // given

    // when
    const wrapper = shallow(
      <Selector
        disabled={false}
        selectedAppointmentCause={EXPECTED_SELECTED_CAUSE}
        appointmentCauses={EXPECTED_CAUSES}
        appointmentCauseChanged={() => true}
      />
    )

    // then
    const actualInputLabel = wrapper.find(InputLabel)
    expect(actualInputLabel).toHaveLength(1)
    expect(actualInputLabel.text()).toBe("Appointment's cause")

    const actualSelect = wrapper.find(Select)
    expect(actualSelect).toHaveLength(1)
    expect(actualSelect.prop('id')).toBe('appointment-cause')
    expect(actualSelect.prop('labelId')).toBe('appointment-cause-label')
    expect(actualSelect.prop('value')).toBe(EXPECTED_SELECTED_CAUSE)
    expect(actualSelect.prop('onChange')).toBeDefined()

    const actualMenuItems = wrapper.find(MenuItem)
    const actualCauses = []
    actualMenuItems.forEach(menuItem => {
      actualCauses.push(menuItem.text())
    })
    expect(actualCauses).toContain(EXPECTED_SELECTED_CAUSE)
    expect(actualCauses).toContain(EXPECTED_SECOND_CAUSE)
  })
})

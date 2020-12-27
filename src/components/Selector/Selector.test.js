import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

import Selector from './Selector'

configure({ adapter: new Adapter() })

describe('<Selector />', () => {
  it('should render active selector with two choices', () => {
    // given
    const selectedCause = 'Test cause 1'
    const secondCause = 'Test cause 2'
    const causes = [selectedCause, secondCause]

    // when
    const wrapper = shallow(
      <Selector
        disabled={false}
        selectedAppointmentCause={selectedCause}
        appointmentCauses={causes}
      />
    )

    // then
    const actualSelect = wrapper.find(Select)
    expect(actualSelect).toHaveLength(1)
    expect(actualSelect.prop('disabled')).toBe(false)
    expect(actualSelect.prop('value')).toBe(selectedCause)

    const actualMenuItems = wrapper.find(MenuItem)
    const actualCauses = []
    actualMenuItems.forEach(menuItem => {
      actualCauses.push(menuItem.text())
    })
    expect(actualCauses).toContain(selectedCause)
    expect(actualCauses).toContain(secondCause)
  })
})

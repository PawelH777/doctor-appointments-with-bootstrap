import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import AppointmentCard from './AppointmentCard'

configure({ adapter: new Adapter() })

describe('<AppointmentCard /> unit tests', () => {
  it('should render appointment card with correctly set info props', () => {
    // given
    const expectedName = 'test name'
    const expectedLastName = 'test lastName'
    const expectedEmail = 'test email'
    const expectedNumber = 'test number'
    const personInfo = {
      name: expectedName,
      lastName: expectedLastName,
      email: expectedEmail,
      number: expectedNumber
    }

    const expectedPersonInformationText =
      expectedName + expectedLastName + expectedEmail + expectedNumber

    // when
    const wrapper = shallow(<AppointmentCard info={personInfo} />)

    // then
    const actualPersonInformation = wrapper.find('div#personInformation')
    expect(actualPersonInformation.text()).toBe(expectedPersonInformationText)
  })
})

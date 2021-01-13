import React from 'react'

import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import AppointmentCard from './AppointmentCard'
import Appointment from '../Appointment/Appointment'

configure({ adapter: new Adapter() })

const EXPECTED_NAME = 'test name'
const EXPECTED_LAST_NAME = 'test lastName'
const EXPECTED_EMAIL = 'test email'
const EXPECTED_NUMBER = 'test number'

describe('<AppointmentCard /> unit tests', () => {
  it('should render appointment card with correctly set props and working remove button', () => {
    // given
    const personInfo = {
      name: EXPECTED_NAME,
      lastName: EXPECTED_LAST_NAME,
      email: EXPECTED_EMAIL,
      number: EXPECTED_NUMBER
    }

    const expectedFirstAppointmentElement = <Appointment key={1} />
    const expectedSecondAppointmentElement = <Appointment key={2} />
    const expectedAppointmentElements = [
      expectedFirstAppointmentElement,
      expectedSecondAppointmentElement
    ]

    const expectedPersonInformationText =
      EXPECTED_NAME + EXPECTED_LAST_NAME + EXPECTED_EMAIL + EXPECTED_NUMBER

    const mockedRemoveReservation = jest.fn()

    // when
    const wrapper = shallow(
      <AppointmentCard
        patientInfo={personInfo}
        appointmentElements={expectedAppointmentElements}
        removeReservation={mockedRemoveReservation}
      />
    )

    wrapper.find('button').simulate('click')

    // then
    const actualPersonInformation = wrapper.find('div#personInformation')
    expect(actualPersonInformation.text()).toBe(expectedPersonInformationText)

    expect(wrapper.find(Appointment)).toHaveLength(2)

    const actualRemoveButton = wrapper.find('button')
    expect(actualRemoveButton).toHaveLength(1)
    expect(actualRemoveButton.prop('onClick')).toBeDefined()
    expect(mockedRemoveReservation).toHaveBeenCalledTimes(1)
  })
})

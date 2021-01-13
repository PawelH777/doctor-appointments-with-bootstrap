import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'

import TimeTable from './TimeTable'
import ListItem from '../ListItem/ListItem'
import { Appointment } from '../../data/dataStructures/Appointment'
import { INTERNAL_MEDICINE_CONSULTATION } from '../../data/constants/AppointmentCausesConstants'

configure({ adapter: new Adapter() })

const EXPECTED_ACTUAL_DATE = new Date().toLocaleDateString()

const buildReservation = (id, hour) => {
  const currentDate = new Date()
  const dateInLocalDateFormat = currentDate.toLocaleDateString()
  const reservation = new Appointment()
  reservation.setId(id + dateInLocalDateFormat)
  reservation.setHour(hour)
  reservation.setDay(currentDate.getDate())
  reservation.setMonth(currentDate.getMonth())
  reservation.setYear(currentDate.getFullYear())
  reservation.setDate(dateInLocalDateFormat)
  reservation.setIsReserved(true)
  reservation.setSelectedAppointmentCause(INTERNAL_MEDICINE_CONSULTATION)
  return reservation
}

describe('<TimeTable /> unit tests', () => {
  it('should render timetable', () => {
    // given
    const firstReservation = buildReservation(1, 10)
    const secondReservation = buildReservation(2, 12)

    // when
    const wrapper = shallow(
      <TimeTable
        appointments={[firstReservation, secondReservation]}
        actualDate={EXPECTED_ACTUAL_DATE}
        listItemClicked={() => true}
        changed={() => true}
      />
    )

    // then
    const actualMuiPickersUtilsProvider = wrapper.find(MuiPickersUtilsProvider)
    expect(actualMuiPickersUtilsProvider).toHaveLength(1)
    expect(actualMuiPickersUtilsProvider.prop('utils')).toBeDefined()

    const actualKeyboardDatePicker = actualMuiPickersUtilsProvider.find(
      KeyboardDatePicker
    )
    expect(actualKeyboardDatePicker).toHaveLength(1)
    expect(actualKeyboardDatePicker.prop('disableToolbar')).toBe(true)
    expect(actualKeyboardDatePicker.prop('variant')).toBe('inline')
    expect(actualKeyboardDatePicker.prop('format')).toBe('MM/dd/yyyy')
    expect(actualKeyboardDatePicker.prop('margin')).toBe('normal')
    expect(actualKeyboardDatePicker.prop('id')).toBe('date-picker-inline')
    expect(actualKeyboardDatePicker.prop('label')).toBe('Date picker inline')
    expect(actualKeyboardDatePicker.prop('value')).toBe(EXPECTED_ACTUAL_DATE)
    expect(actualKeyboardDatePicker.prop('onChange')).toBeDefined()
    expect(actualKeyboardDatePicker.prop('disablePast')).toBe(true)
    expect(actualKeyboardDatePicker.prop('shouldDisableDate')).toBeDefined()
    expect(actualKeyboardDatePicker.prop('KeyboardButtonProps')).toBeDefined()

    const actualListElements = wrapper.find(ListItem)
    expect(actualListElements).toHaveLength(2)
    actualListElements.forEach(actualListElement => {
      expect(actualListElement.prop('isButton')).toBe(true)
      expect(actualListElement.prop('isDisabled')).toBe(true)
      expect(actualListElement.prop('clicked')).toBeDefined()
      expect(actualListElement.prop('primary')).toBeDefined()
      expect(actualListElement.prop('secondary')).toBe('Reserved')
      expect(actualListElement.prop('paperCss')).toBeDefined()
    })
  })
})

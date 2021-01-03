import React, { Component } from 'react'
import { connect } from 'react-redux'

import classes from './AppointmentsScheduler.module.css'
import TimeTable from '../../../components/TimeTable/TimeTable'
import ReservedAppointments from '../../../components/ReservedAppointments/ReservedAppointments'
import Spinner from '../../../components/Spinner/Spinner'
import { prepareAppointmentsMap } from '../../../utilities/appointmentUtilities'
import { determineFirstAvailableDay } from '../../../utilities/dateUtilties'
import axios from '../../../axios-doctor-appointments'
import * as Causes from '../../../data/constants/AppointmentCausesConstants'

class AppointmentsScheduler extends Component {
  state = {
    actualDate: determineFirstAvailableDay(),
    allAppointmentsFromActualDay: [],
    reservedAppointments: [],
    appointmentsRange: {},
    appointmentCauses: [
      Causes.INTERNAL_MEDICINE_CONSULTATION,
      Causes.FAMILY_DOCTOR_CONSULTATION,
      Causes.ONLINE_CONSULTATION
    ],
    loading: true
  }

  componentDidMount () {
    axios
      .get('/appointments.json?auth=' + this.props.token) // TODO Change this request in the way that appointments < current day aren't retrieved
      .then(response => this.appointmentsFoundHandler(response))
      .catch(err => console.log(err))
  }

  appointmentsFoundHandler = response => {
    const alreadyReservedAppointments = []
    for (let key in response.data) {
      alreadyReservedAppointments.push(
        ...response.data[key].reservedAppointments
      )
    }
    const appointmentsFromEachAvailableDay = prepareAppointmentsMap(
      alreadyReservedAppointments
    )
    const dateConvertedToString = this.state.actualDate.toLocaleDateString()
    const actualDayAppointments =
      appointmentsFromEachAvailableDay[dateConvertedToString]
    this.setState({
      appointmentsRange: appointmentsFromEachAvailableDay,
      allAppointmentsFromActualDay: actualDayAppointments,
      loading: false
    })
  }

  dateChangeHandler = date => {
    const appointmentsFromActualDay = this.state.appointmentsRange[
      date.toLocaleDateString()
    ]
    this.setState({
      actualDate: date,
      allAppointmentsFromActualDay: appointmentsFromActualDay
    })
  }

  appointmentCauseChangeHandler = (event, reservedAppointment) => {
    const updatedReservedAppointments = this.state.reservedAppointments.map(
      nextReservedAppointment => {
        if (nextReservedAppointment.id === reservedAppointment.id) {
          nextReservedAppointment.selectedAppointmentCause = event.target.value
        }
        return nextReservedAppointment
      }
    )
    this.setState({ reservedAppointments: updatedReservedAppointments })
  }

  listItemClickHandler = appointment => {
    const updatedAppointmentsFromActualDay = this.changeAppointmentReservationStatus(
      appointment,
      true
    )
    this.setState({
      allAppointmentsFromActualDay: updatedAppointmentsFromActualDay,
      appointmentsRange: this.updateAppointmentsRange(
        this.state.actualDate.toLocaleDateString(),
        updatedAppointmentsFromActualDay
      ),
      reservedAppointments: this.addChoosedAppointmentToAlreadyReservedAppointments(
        appointment
      )
    })
  }

  changeAppointmentReservationStatus = (
    appointment,
    shouldBeAppointmentReserved
  ) => {
    return this.state.appointmentsRange[appointment.date].map(
      nextAppointmentFromSpecifiedDay => {
        if (nextAppointmentFromSpecifiedDay.id === appointment.id) {
          return {
            ...nextAppointmentFromSpecifiedDay,
            isReserved: shouldBeAppointmentReserved
          }
        } else {
          return nextAppointmentFromSpecifiedDay
        }
      }
    )
  }

  updateAppointmentsRange = (day, updatedDates) => {
    return {
      ...this.state.appointmentsRange,
      [day]: updatedDates
    }
  }

  addChoosedAppointmentToAlreadyReservedAppointments = appointment => {
    const newReservedAppointment = {
      ...appointment,
      isReserved: true,
      selectedAppointmentCause: Causes.INTERNAL_MEDICINE_CONSULTATION
    }
    const updatedReservedAppointments = [...this.state.reservedAppointments]
    updatedReservedAppointments.push(newReservedAppointment)
    return updatedReservedAppointments
  }

  removeReservationClickHandler = reservedAppointment => {
    const updatedAppointmentsFromActualDay = this.changeAppointmentReservationStatus(
      reservedAppointment,
      false
    )
    this.setState({
      appointmentsRange: this.updateAppointmentsRange(
        reservedAppointment.date,
        updatedAppointmentsFromActualDay
      ),
      reservedAppointments: this.filterOutReservation(reservedAppointment.id)
    })
    if (
      reservedAppointment.date === this.state.actualDate.toLocaleDateString()
    ) {
      this.setState({
        allAppointmentsFromActualDay: updatedAppointmentsFromActualDay
      })
    }
  }

  filterOutReservation = reservedAppointmentId => {
    return this.state.reservedAppointments.filter(
      nextReservedAppointment =>
        nextReservedAppointment.id !== reservedAppointmentId
    )
  }

  render () {
    const scheduler = (
      <div className={classes.Scheduler}>
        <TimeTable
          appointments={this.state.allAppointmentsFromActualDay}
          listItemClicked={this.listItemClickHandler}
          actualDate={this.state.actualDate}
          changed={this.dateChangeHandler}
        />
        {this.state.reservedAppointments.length > 0 ? (
          <ReservedAppointments
            reservations={this.state.reservedAppointments}
            appointmentCauses={this.state.appointmentCauses}
            appointmentCauseChanged={this.appointmentCauseChangeHandler}
            removeReservationClicked={this.removeReservationClickHandler}
            isUserLogged={this.props.isAuthenticated}
          />
        ) : null}
      </div>
    )
    return this.state.loading ? <Spinner /> : scheduler
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    isAuthenticated: state.auth.token !== null
  }
}

export default connect(mapStateToProps)(AppointmentsScheduler)

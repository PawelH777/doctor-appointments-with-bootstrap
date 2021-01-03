import React, { Component } from 'react'
import { connect } from 'react-redux'

import classes from './Appointments.module.css'
import Appointment from '../../../components/Appointment/Appointment'
import AppointmentCard from '../../../components/AppointmentCard/AppointmentCard'
import Spinner from '../../../components/Spinner/Spinner'
import { prepareAppointmentDateElement } from '../../../utilities/appointmentUtilities'
import axios from '../../../axios-doctor-appointments'
import { AppointmentReservation } from '../../../data/dataStructures/AppointmentReservation'

class Appointments extends Component {
  state = {
    appointments: [],
    loading: true
  }

  componentDidMount () {
    const queryParams = // TODO Change this request in the way that appointments < current day aren't retrieved
      '?auth=' +
      this.props.token +
      '&orderBy="userId"&equalTo="' +
      this.props.userId +
      '"'
    axios.get('/appointments.json' + queryParams).then(response =>
      this.setState({
        appointments: this.collectAppointments(response),
        loading: false
      })
    )
  }

  collectAppointments = response => {
    const appointments = []
    for (let key in response.data) {
      appointments.push(this.buildAppointment(response.data[key], key))
    }
    return appointments
  }

  buildAppointment = (appointmentData, appointmentKey) => {
    const appointment = new AppointmentReservation()
    appointment.setId(appointmentKey)
    appointment.setPatientInformation(appointmentData.patientInformation)
    appointment.setReservedAppointments(appointmentData.reservedAppointments)
    return appointment
  }

  removeReservedReservationHandler = appointmentKey => {
    axios
      .delete(
        '/appointments/' + appointmentKey + '.json?auth=' + this.props.token
      )
      .then(() => {
        this.setState({
          appointments: this.filterAppointments(appointmentKey)
        })
      })
      .catch(error => console.log(error))
  }

  filterAppointments = keyOfAppointmentToBeRemoved => {
    return this.state.appointments.filter(
      nextAppointment => nextAppointment.id !== keyOfAppointmentToBeRemoved
    )
  }

  render () {
    const appointmentCards = []
    let technicalKey = 0
    for (let appointmentKey in this.state.appointments) {
      const appointment = this.state.appointments[appointmentKey]
      const reservedAppointmentElements = this.createAppointmentsElements(
        appointment.reservedAppointments,
        technicalKey
      )
      if (reservedAppointmentElements.length === 0) {
        continue
      }
      const appointmentCard = (
        <AppointmentCard
          key={appointmentKey}
          appointmentId={appointment.id}
          patientInfo={appointment.patientInformation}
          appointmentElements={reservedAppointmentElements}
          removeReservation={this.removeReservedReservationHandler}
        />
      )
      appointmentCards.push(appointmentCard)
    }
    return this.createContent(appointmentCards)
  }

  createAppointmentsElements = (reservedAppointments, technicalKey) => {
    const reservedAppointmentElements = []
    for (let appointmentKey in reservedAppointments) {
      const date = this.parseToDate(reservedAppointments[appointmentKey])
      const choosedAppointmentCause =
        reservedAppointments[appointmentKey].selectedAppointmentCause
      if (date < new Date()) {
        continue
      }
      const appointmentElement = (
        <Appointment
          key={technicalKey++}
          editMode={false}
          appointmentTerm={prepareAppointmentDateElement(
            date.toLocaleDateString(),
            date.getHours()
          )}
          selectedAppointmentCause={choosedAppointmentCause}
        />
      )
      reservedAppointmentElements.push(appointmentElement)
    }
    return reservedAppointmentElements
  }

  parseToDate = date => {
    return new Date(date.year, date.month, date.day, date.hour)
  }

  createContent = appointmentCards => {
    if (!this.state.loading) {
      if (appointmentCards.length > 0) {
        return <div className={classes.Appointments}>{appointmentCards}</div>
      } else {
        return (
          <div className='h2 align-self-center'>
            No appointments! Please make a new one to view it there.
          </div>
        )
      }
    }
    return <Spinner />
  }
}

const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps)(Appointments)

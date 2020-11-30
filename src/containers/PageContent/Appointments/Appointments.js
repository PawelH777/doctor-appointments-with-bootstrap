import React, { Component } from 'react'
import { connect } from 'react-redux'

import axios from '../../../axios-doctor-appointments'
import SelectedDate from '../../../components/Appointment/Appointment'
import AppointmentCard from '../../../components/AppointmentCard/AppointmentCard'
import { prepareAppointmentDateElement } from '../../../utilities/appointmentUtilities'
import Spinner from '../../../components/Spinner/Spinner'
import classes from './Appointments.module.css'

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
    axios
      .get('/appointments.json' + queryParams)
      .then(response =>
        this.setState({ appointments: collectAppointments(response), loading: false })
      )
  }

  removeReservedReservationHandler = appointmentKey => {
    axios
      .delete(
        '/appointments/' + appointmentKey + '.json?auth=' + this.props.token
      )
      .then(() => {
        this.setState({
          appointments: filterAppointments(
            this.state.appointments,
            appointmentKey
          )
        })
      })
      .catch(error => console.log(error))
  }

  render () {
    const appointments = []
    let technicalKey = 0
    for (let appointmentKey in this.state.appointments) {
      const appointment = this.state.appointments[appointmentKey]
      const reservedDates = createSelectedDateElements(
          appointment.dates,
          appointment.appointmentCauses,
          technicalKey
      )
      if(reservedDates.length === 0) {
        continue
      }
      const appointmentCard = (
        <AppointmentCard
          key={appointmentKey}
          info={appointment.information}
          dates={reservedDates}
          removeReservation={this.removeReservedReservationHandler}
          appointmentId={appointment.id}
        />
      )
      appointments.push(appointmentCard)
    }
    return createContent(appointments, this.state.loading)
  }
}

const collectAppointments = response => {
  const appointments = []
  for (let key in response.data) {
    appointments.push(buildAppointment(response.data[key], key))
  }
  return appointments
}

const buildAppointment = (appointmentData, appointmentKey) => {
  return {
    id: appointmentKey,
    information: appointmentData.personalInfo,
    dates: {
      ...appointmentData.selectedDates
    }
  }
}

const filterAppointments = (appointments, keyOfAppointmentToBeRemove) => {
  return appointments.filter(app => app.id !== keyOfAppointmentToBeRemove)
}

const createSelectedDateElements = (
  selectedDates,
  appointmentCauses,
  technicalKey
) => {
  const selectedDatesElements = []
  for (let dateKey in selectedDates) {
    const date = parseToDate(selectedDates[dateKey])
    const chosenAppointmentCause = selectedDates[dateKey].selectedAppointmentCause
    if(date < new Date()){
      continue
    }
    const formattedDate = (
      <SelectedDate
        key={technicalKey++}
        editMode={false}
        appointmentTerm={prepareAppointmentDateElement(date.toLocaleDateString(), date.getHours())}
        appointmentCauses={appointmentCauses}
        selectedAppointmentCause={chosenAppointmentCause}
      />
    )
    selectedDatesElements.push(formattedDate)
  }
  return selectedDatesElements
}

const parseToDate = (selectedDate) => {
  return new Date(
      selectedDate.year,
      selectedDate.month,
      selectedDate.day,
      selectedDate.hour
  )
}

const createContent = (appointments, loading) => {
  if(!loading) {
    if(appointments.length > 0){
      return <div className={classes.Appointments}>{appointments}</div>
    }
    else {
       return <div className='h2 align-self-center'>
            No appointments! Please make a new one to view it there.
          </div>
    }
  }
  return <Spinner />
}


const mapStateToProps = state => {
  return {
    token: state.auth.token,
    userId: state.auth.userId
  }
}

export default connect(mapStateToProps)(Appointments)

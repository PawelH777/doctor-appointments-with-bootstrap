import React, { Component } from 'react';
import { connect } from 'react-redux';

import axios from '../../../axios-appointments';
import classes from './Appointments.module.css';
import Appointment from '../../../components/Content/Appointment/Appointment';
import AppointmentCard from '../../../components/Content/AppointmentCard/AppointmentCard';

const prepareAppointmentTerm = (selectedDate) => {
    return (
        <div>
            <h6>{selectedDate.hour}:00</h6>
            <h5>{selectedDate.date}</h5>
        </div>
    );
}

class Appointments extends Component {
    state = {
        appointments: []
    }

    componentDidMount() {
        const queryParams = '?auth=' + this.props.token + '&orderBy="userId"&equalTo="' + this.props.userId + '"';
        axios.get('/appointments.json' + queryParams)
            .then(response => {
                const appointments = [];
                for (let key in response.data) {
                    const personalInfo = response.data[key].personalInfo;
                    const selectedDates = response.data[key].selectedDates;
                    const appointment = {
                        id: key,
                        information: personalInfo,
                        dates: {
                            ...selectedDates
                        }
                    }
                    appointments.push(appointment);
                }
                this.setState({ appointments: appointments });
            });
    }

    removeReservedReservationHandler = (appointmentKey) => {
        axios.delete('/appointments/' + appointmentKey + '.json?auth=' + this.props.token)
            .then(res => {
                const updatedAppointments = this.state.appointments
                    .filter(app => app.id !== appointmentKey);
                this.setState({ appointments: updatedAppointments });
            })
            .catch(error => console.log(error));
    }

    render() {
        const appointments = [];
        for (let appointmentKey in this.state.appointments) {
            const appointment = this.state.appointments[appointmentKey];
            const information = this.state.appointments[appointmentKey].information;
            const selectedDates = [];
            for (let dateKey in appointment.dates) {
                const date = appointment.dates[dateKey];
                const term = prepareAppointmentTerm(date);
                const formattedDate = <Appointment
                    key={term}
                    editMode={false}
                    appointmentTerm={term}
                    appointmentCauses={this.state.appointmentCauses}
                    selectedAppointmentCause={date.selectedAppointmentCause}
                    appointmentCauseChanged={(event) => this.appointmentCauseChangeHandler(event, date)}
                    removeReservedAppointment={() => this.removeReservedAppointmentHandler(date)} />;
                selectedDates.push(formattedDate);
            }
            const appointmentCard = (
                <AppointmentCard 
                    info = {information}
                    dates = {selectedDates}
                    removeReservation = {this.removeReservedReservationHandler}
                    appointmentId = {appointment.id}/>
            );
            appointments.push(appointmentCard);
        }

        return (
            <div className={classes.Appointments}>
                {appointments}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.auth.token,
        userId: state.auth.userId
    };
}

export default connect(mapStateToProps)(Appointments);
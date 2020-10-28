import 'date-fns';

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import DateFnsUtils from '@date-io/date-fns';
import Divider from '@material-ui/core/Divider';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

import Aux from '../../../hoc/Auxiliary/Auxiliary';
import ListItem from '../../../components/UI/ListItem/ListItem';
import classes from './NewAppointment.module.css'
import Appointment from '../../../components/Content/Appointment/Appointment';
import { prepareAppointmentsMap } from '../../../shared/utility';

const prepareAppointmentTerm = (selectedDate) => {
    return (<div><h5>{selectedDate.hour}:00</h5><div>{selectedDate.date}</div></div>);
}

class NewAppointment extends Component {
    state = {
        date: new Date(),
        appointmentMap: {},
        dates: [],
        selectedDates: [],
        appointmentCauses: [
            "Internal medicine consultation",
            "Family doctor consultation",
            "Online consultation"
        ]
    }

    componentDidMount() {
        const appointmentMap = prepareAppointmentsMap(60);
        const dateConvertedToString = this.state.date.toLocaleDateString();
        const reservationFromCurrentDay = appointmentMap[dateConvertedToString];
        this.setState({
            appointmentMap: appointmentMap,
            dates: reservationFromCurrentDay
        });
    }

    dateChangeHandler = (date) => {
        const reservationFromCurrentDay = this.state.appointmentMap[date.toLocaleDateString()];
        this.setState({
            date: date,
            dates: reservationFromCurrentDay
        });
    };

    appointmentCauseChangeHandler = (event, selDate) => {
        const updatedSelectedDates = this.state.selectedDates.map(
            selectedDate => {
                if (selectedDate.id === selDate.id) {
                    selectedDate.selectedAppointmentCause = event.target.value;
                }
                return selectedDate;
            }
        );
        this.setState({ selectedDates: updatedSelectedDates });
    };

    listItemClickedHandler = (appointment) => {
        const updatedDates = this.state.dates
            .map(app => {
                if (app.id === appointment.id) {
                    return {
                        ...app,
                        isReserved: true
                    }
                } else {
                    return app;
                }
            });
        let updatedAppointmentMap = {
            ...this.state.appointmentMap,
            [this.state.date.toLocaleDateString()]: updatedDates
        }
        const updatedSelectedDates = [...this.state.selectedDates];
        const newSelectedDate = {
            ...appointment,
            isReserved: true,
            selectedAppointmentCause: "Internal medicine consultation"
        }
        updatedSelectedDates.push(newSelectedDate);
        this.setState({
            dates: updatedDates,
            appointmentMap: updatedAppointmentMap,
            selectedDates: updatedSelectedDates
        });
    }

    removeReservedAppointmentHandler = (reservedDate) => {
        const updatedDates = this.state.appointmentMap[reservedDate.date]
            .map(app => {
                if (app.hour === reservedDate.hour) {
                    return {
                        ...app,
                        isReserved: false
                    }
                } else {
                    return app;
                }
            });
        const updatedAppointmentMap = {
            ...this.state.appointmentMap,
            [reservedDate.date]: updatedDates
        }
        const updatedSelectedDates = this.state.selectedDates
            .filter(selectedDate => selectedDate.id !== reservedDate.id);
        this.setState({
            appointmentMap: updatedAppointmentMap,
            selectedDates: updatedSelectedDates
        });
        if (reservedDate.date === this.state.date.toLocaleDateString()) {
            this.setState({
                dates: updatedDates
            });
        }
    }

    proceedWithReservation = () => {
        this.props.history.push({
            pathname: '/new/details',
            state: { dates: this.state.selectedDates }
        });
    }

    redirectToSignIn = () => {
        this.props.history.push({
            pathname: '/login'
        });
    }

    render() {
        const listItems = [];
        let id = 0;
        this.state.dates.map(
            appointment => {
                const term = prepareAppointmentTerm(appointment);
                const listItem = (
                    <ListItem
                        key={id}
                        isButton
                        isDisabled={appointment.isReserved}
                        clicked={() => this.listItemClickedHandler(appointment)}
                        primary={term}
                        secondary={appointment.isReserved ? "Reserved" : "Not reserved"}
                        paperCss={classes.Paper} />
                );
                listItems.push(listItem);
                id++;
                return null;
            }
        );
        const newAppointments = this.state.selectedDates.map(selectedDate => {
            const term = prepareAppointmentTerm(selectedDate);
            return <Appointment
                key={term}
                editMode={true}
                appointmentTerm={term}
                appointmentCauses={this.state.appointmentCauses}
                selectedAppointmentCause={selectedDate.selectedAppointmentCause}
                appointmentCauseChanged={(event) => this.appointmentCauseChangeHandler(event, selectedDate)}
                removeReservedAppointment={() => this.removeReservedAppointmentHandler(selectedDate)} />
        });
        let redirectButton;
        if (this.state.selectedDates.length > 0) {
            if (this.props.isAuthenticated) {
                redirectButton = (
                    <div>
                        <button
                            type="button"
                            className="btn btn-primary w-25 h-25 mb-5"
                            onClick={this.proceedWithReservation}>PROCEED</button>
                    </div>);
            } else {
                redirectButton = (
                    <div>
                        <button
                            type="button"
                            className="btn btn-primary w-25 h-25 mb-5"
                            onClick={this.redirectToSignIn}>PLEASE SIGN IN</button>
                    </div>);
            }
        }
        return (
            <Aux>
                <div className={classes.TimeTable}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            margin="normal"
                            id="date-picker-inline"
                            label="Date picker inline"
                            value={this.state.date}
                            onChange={this.dateChangeHandler}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                        />
                        <div className={classes.ListWrapper}>
                            {listItems}
                        </div>
                    </MuiPickersUtilsProvider>
                </div>
                <Divider />
                {newAppointments}
                {redirectButton}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
}

export default connect(mapStateToProps)(withRouter(NewAppointment));
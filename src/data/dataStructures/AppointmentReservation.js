export class AppointmentReservation {
  id
  userId
  patientInformation
  reservedAppointments

  setId (appointmentId) {
    this.id = appointmentId
  }

  setUserId (userId) {
    this.userId = userId
  }

  setPatientInformation (patientInfo) {
    this.patientInformation = patientInfo
  }

  setReservedAppointments (appointments) {
    this.reservedAppointments = {
      ...appointments
    }
  }
}

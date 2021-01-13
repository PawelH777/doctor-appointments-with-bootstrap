export class Appointment {
  id
  hour
  day
  month
  year
  date
  isReserved
  selectedAppointmentCause

  setId (identificator) {
    this.id = identificator
  }

  setHour (hour) {
    this.hour = hour
  }

  setDay (day) {
    this.day = day
  }

  setMonth (month) {
    this.month = month
  }

  setYear (year) {
    this.year = year
  }

  setDate (date) {
    this.date = date
  }

  setIsReserved (isReserved) {
    this.isReserved = isReserved
  }

  setSelectedAppointmentCause (cause) {
    this.selectedAppointmentCause = cause
  }
}

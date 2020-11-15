import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-doctor-appointments.firebaseio.com/'
})

export const findAppointments = (token, callback) => {
  instance
    .get('/appointments.json?auth=' + token)
    .then(callback)
    .catch(err => console.log(err))
}

export default instance

import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://react-doctor-appointments.firebaseio.com/'
})

export default instance

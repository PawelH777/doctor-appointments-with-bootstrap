import React from 'react'
import { withRouter } from 'react-router-dom'

const dynamicReservationButton = props => {
  const proceedWithReservation = () => {
    props.history.push({
      pathname: '/scheduler/patient-info',
      state: { reservedAppointments: props.reservedAppointments }
    })
  }

  const redirectToSignIn = () => {
    props.history.push({
      pathname: '/login'
    })
  }

  const isAuthenticated = props.isAuthenticated
  const onClickAction = isAuthenticated
    ? () => proceedWithReservation()
    : () => redirectToSignIn()
  const buttonLabel = isAuthenticated ? 'PROCEED' : 'PLEASE SIGN IN'

  return (
    <div className='my-3'>
      <button
        type='button'
        className='btn btn-primary w-25 h-25 mb-5'
        onClick={onClickAction}
      >
        {buttonLabel}
      </button>
    </div>
  )
}

export default withRouter(dynamicReservationButton)

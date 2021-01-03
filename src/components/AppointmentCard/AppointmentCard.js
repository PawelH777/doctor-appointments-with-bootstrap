import React from 'react'

const appointmentCard = props => (
  <div className='card mb-5'>
    <div className='card-body text-center'>
      <h5 className='card-title'>Appointment's reservation</h5>
      <h6 className='card-subtitle mb-2 text-muted'>Personal information:</h6>
      <div className='container mb-3 text-left'>
        <div className='row justify-content-md-center'>
          <div className='col-sm-3 font-weight-bold'>
            Name: <br />
            Last name: <br />
            Email: <br />
            Number: <br />
          </div>
          <div id={'personInformation'} className='col-sm-3'>
            {props.patientInfo.name}
            <br />
            {props.patientInfo.lastName}
            <br />
            {props.patientInfo.email}
            <br />
            {props.patientInfo.number}
          </div>
        </div>
      </div>
      <h6 className='card-subtitle mb-1 text-muted'>Reserved appointments: </h6>
      <span id={'selectedDates'}>{props.appointmentElements}</span>
      <div className='mt-3 mb-3'>
        <button
          type='button'
          className='btn btn-danger w-50 h-25'
          onClick={() => props.removeReservation(props.appointmentId)}
        >
          REMOVE
        </button>
      </div>
    </div>
  </div>
)

export default appointmentCard

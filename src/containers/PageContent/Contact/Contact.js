import React, { Component } from 'react'

import Divider from '@material-ui/core/Divider'

import axios from '../../../axios-doctor-appointments'
import { EmailDataModel } from '../../../data/stateDataModels/EmailDataModel'
import { ContentDataModel } from '../../../data/stateDataModels/ContentDataModel'
import { TitleDataModel } from '../../../data/stateDataModels/TitleDataModel'
import Form from '../../Form/Form'
import Map from '../../../components/Map/Map'

class Contact extends Component {
  state = {
    inputs: {
      email: new EmailDataModel(),
      title: new TitleDataModel(),
      content: new ContentDataModel()
    },
    isFormValid: false
  }

  submitHandler = inputs => {
    const message = {
      email: inputs.email.attributes.value,
      title: inputs.title.attributes.value,
      content: inputs.content.attributes.value
    }
    axios
      .post('/messages.json', message)
      .then(() => {
        window.alert('Message has been send.')
        window.location.reload()
      })
      .catch(error => {
        console.log(error)
        window.alert("Message couldn't be sent because of the issue.")
        window.location.reload()
      })
  }

  render () {
    return (
      <div className='d-flex w-100 align-items-center'>
        <div className='w-50 mr-5'>
          <Map />
        </div>
        <Divider orientation='vertical' flexItem />
        <div className='w-50 mt-5 ml-5'>
          <h4>Doctor Pawel Hornik</h4>
          <h4>631-601 Morse Ave</h4>
          <h4>Sunnyvale, CA 94085</h4>
          <Form inputs={this.state.inputs} submitted={this.submitHandler} />
        </div>
      </div>
    )
  }
}

export default Contact

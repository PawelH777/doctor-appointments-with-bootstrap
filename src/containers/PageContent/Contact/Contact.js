import React, { Component } from 'react'

import Divider from '@material-ui/core/Divider'

import { EmailDataModel } from '../../../data/stateDataModels/EmailDataModel'
import { ContentDataModel } from '../../../data/stateDataModels/ContentDataModel'
import { TitleDataModel } from '../../../data/stateDataModels/TitleDataModel'
import Form from '../../Form/Form'
import Map from '../../../components/Map/Map'

class Contact extends Component {
  state = {
    inputs: {
      email: new EmailDataModel(),
      title: TitleDataModel,
      content: ContentDataModel
    },
    isFormValid: false
  }

  submitHandler = () => {}

  render () {
    return (
      <div className='d-flex'>
        <div className='w-50 mr-5 align-self-center'>
          <Map />
        </div>
        <Divider orientation='vertical' flexItem />
        <div className='w-50 mt-5 ml-5 align-self-center'>
          <p>Doctor Pawel Hornik</p>
          <p>631-601 Morse Ave</p>
          <p>Sunnyvale, CA 94085</p>
          <Form inputs={this.state.inputs} submitted={this.submitHandler} />
        </div>
      </div>
    )
  }
}

export default Contact

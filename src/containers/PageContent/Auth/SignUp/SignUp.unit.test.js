import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter as Router } from 'react-router-dom'
import axios from 'axios'

import SignUp from './SignUp'
import FormWithShadow from '../../../../components/FormWithShadow/FormWithShadow'
import { NameDataModel } from '../../../../data/inputsDataModels/NameDataModel'
import { LastNameDataModel } from '../../../../data/inputsDataModels/LastNameDataModel'
import { EmailDataModel } from '../../../../data/inputsDataModels/EmailDataModel'
import { NumberDataModel } from '../../../../data/inputsDataModels/NumberDataModel'
import { PasswordDataModel } from '../../../../data/inputsDataModels/PasswordDataModel'
import { RepeatedPasswordDataModel } from '../../../../data/inputsDataModels/RepeatedPasswordDataModel'
import axiosAppointments from '../../../../axios-doctor-appointments'

configure({ adapter: new Adapter() })

jest.mock('../../../../axios-doctor-appointments')
jest.mock('axios')

describe('<SignUp /> unit tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should render SignUp component', () => {
    // given

    // when
    const wrapper = mount(
      <Router>
        <SignUp />
      </Router>
    )

    // then
    const actualFormWithShadow = wrapper.find(FormWithShadow)
    expect(actualFormWithShadow).toHaveLength(1)

    const actualInputs = actualFormWithShadow.prop('inputs')
    expect(actualInputs).toBeDefined()
    expect(actualInputs.name).toMatchObject(new NameDataModel())
    expect(actualInputs.lastName).toMatchObject(new LastNameDataModel())
    expect(actualInputs.email).toMatchObject(new EmailDataModel())
    expect(actualInputs.number).toMatchObject(new NumberDataModel())
    expect(actualInputs.password).toMatchObject(new PasswordDataModel(true))
    expect(actualInputs.repeatedPassword).toMatchObject(
      new RepeatedPasswordDataModel()
    )

    expect(actualFormWithShadow.prop('submitted')).toBeDefined()
  })

  // TO DO <- Fix this test
  // it('should sign up method be performed correctly', async () => {
  //   // given
  //   window.alert = jest.fn()

  //   const axiosCallResponse = { status: 200 }
  //   axios.post.mockImplementation(() => Promise.resolve(axiosCallResponse))
  //   axiosAppointments.post.mockImplementation(() =>
  //     Promise.resolve(axiosCallResponse)
  //   )

  //   const mockedGoBackMethod = jest.fn()
  //   const initialProps = {
  //     history: {
  //       goBack: mockedGoBackMethod
  //     }
  //   }

  //   const submitMethodArguments = {
  //     email: {
  //       attributes: {
  //         value: 'Email test value'
  //       }
  //     },
  //     password: {
  //       attributes: {
  //         value: 'Password test value'
  //       }
  //     },
  //     name: {
  //       attributes: {
  //         value: 'Name test value'
  //       }
  //     },
  //     lastName: {
  //       attributes: {
  //         value: 'Last name test value'
  //       }
  //     },
  //     number: {
  //       attributes: {
  //         value: 'Number test value'
  //       }
  //     }
  //   }

  //   // when
  //   const wrapper = mount(
  //     <Router>
  //       <SignUp {...initialProps} />
  //     </Router>
  //   )
  //   await wrapper
  //     .find(FormWithShadow)
  //     .props()
  //     .submitted(submitMethodArguments)

  //   // then
  //   expect(axios).toHaveBeenCalledTimes(1)
  //   expect(axios).toBeCalledWith({
  //     method: 'POST',
  //     url:
  //       'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDOLpcWn2ABinExUQ6BzuXFW0AjVITXM94'
  //   })
  //   expect(axiosAppointments).toHaveBeenCalledTimes(1)
  //   expect(axiosAppointments).toBeCalledWith({
  //     method: 'POST',
  //     url: '/users.json'
  //   })
  // })
})

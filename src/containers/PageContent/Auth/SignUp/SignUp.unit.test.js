import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { MemoryRouter as Router } from 'react-router-dom'

import SignUp from './SignUp'
import FormWithShadow from '../../../../components/FormWithShadow/FormWithShadow'
import { NameDataModel } from '../../../../data/inputsDataModels/NameDataModel'
import { LastNameDataModel } from '../../../../data/inputsDataModels/LastNameDataModel'
import { EmailDataModel } from '../../../../data/inputsDataModels/EmailDataModel'
import { NumberDataModel } from '../../../../data/inputsDataModels/NumberDataModel'
import { PasswordDataModel } from '../../../../data/inputsDataModels/PasswordDataModel'
import { RepeatedPasswordDataModel } from '../../../../data/inputsDataModels/RepeatedPasswordDataModel'

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
})

import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Form from './Form'
import FormInput from '../../components/FormInput/FormInput'
import { NumberDataModel } from '../../data/stateDataModels/NumberDataModel'
import { ContentDataModel } from '../../data/stateDataModels/ContentDataModel'
import { PasswordDataModel } from '../../data/stateDataModels/PasswordDataModel'

configure({ adapter: new Adapter() })

describe('<Form /> unit tests', () => {
  it('should render form with number and content inputs with disabled button', () => {
    // given
    const contentModel = new ContentDataModel()
    const numberModel = new NumberDataModel()
    const expectedContentLabel = contentModel.label
    const expectedContentAttributes = contentModel.attributes
    const expectedNumberLabel = numberModel.label
    const expectedNumberAttributes = numberModel.attributes
    const formInputs = {
      content: contentModel,
      number: numberModel
    }

    // when
    const wrapper = mount(<Form inputs={formInputs} submitted={null} />)
    wrapper.update()

    // then
    const actualInputs = wrapper.find(FormInput)
    expect(actualInputs).toHaveLength(2)

    // Content textarea
    const actualContentInput = actualInputs.filterWhere(
      input => input.prop('attributes').id === 'content'
    )
    expect(actualContentInput).toHaveLength(1)
    expect(actualContentInput.prop('label')).toBe(expectedContentLabel)
    expect(actualContentInput.prop('attributes')).toBe(
      expectedContentAttributes
    )
    expect(actualContentInput.prop('valueChanged')).toBeDefined()
    expect(actualContentInput.prop('errors')).toBeDefined()

    // Number input
    const actualNumberInput = actualInputs.filterWhere(
      input => input.prop('attributes').id === 'number'
    )
    expect(actualNumberInput).toHaveLength(1)
    expect(actualNumberInput.prop('label')).toBe(expectedNumberLabel)
    expect(actualNumberInput.prop('attributes')).toBe(expectedNumberAttributes)
    expect(actualNumberInput.prop('valueChanged')).toBeDefined()
    expect(actualNumberInput.prop('errors')).toBeDefined()

    // Button
    const actualButton = wrapper.find('button')
    expect(actualButton).toHaveLength(1)
    expect(actualButton.prop('disabled')).toBe(true)
    expect(actualButton.prop('onClick')).toBeDefined()
  })

  it('should correct values be inserted that passes the validation and make submitting available', () => {
    // given
    const submitMock = jest.fn()
    const contentModel = new ContentDataModel()
    const numberModel = new NumberDataModel()
    const formInputs = {
      content: contentModel,
      number: numberModel
    }
    const expectedContentNewValue = 'Test content'
    const expectedNumberNewValue = '111222333'

    // when
    const wrapper = mount(<Form inputs={formInputs} submitted={submitMock} />)
    wrapper.update()

    wrapper.find('textarea#content').simulate('change', {
      target: { value: expectedContentNewValue }
    })

    wrapper.find('input#number').simulate('change', {
      target: { value: expectedNumberNewValue }
    })

    wrapper.find('button').simulate('click')

    // then
    const actualInputs = wrapper.find(FormInput)
    expect(actualInputs).toHaveLength(2)

    // Content textarea
    const actualContentInput = actualInputs.filterWhere(
      input => input.prop('attributes').id === 'content'
    )
    expect(actualContentInput).toHaveLength(1)
    expect(actualContentInput.prop('attributes').value).toBe(
      expectedContentNewValue
    )
    expect(actualContentInput.prop('errors')).toHaveLength(0)

    // Number input
    const actualNumberInput = actualInputs.filterWhere(
      input => input.prop('attributes').id === 'number'
    )
    expect(actualNumberInput).toHaveLength(1)
    expect(actualNumberInput.prop('attributes').value).toBe(
      expectedNumberNewValue
    )
    expect(actualNumberInput.prop('errors')).toHaveLength(0)

    // Button
    const actualButton = wrapper.find('button')
    expect(actualButton).toHaveLength(1)
    expect(actualButton.prop('disabled')).toBe(false)
    expect(submitMock).toHaveBeenCalledTimes(1)
  })

  it('should incorrect values be inserted and fail the validation', () => {
    // given
    const numberModel = new NumberDataModel()
    const passwordModel = new PasswordDataModel(false)
    const formInputs = {
      number: numberModel,
      password: passwordModel
    }
    const expectedNewNumberValue = 'not numeric'
    const expectedNewPasswordValue = ''

    // when
    const wrapper = mount(<Form inputs={formInputs} submitted={null} />)
    wrapper.update()

    wrapper.find('input#number').simulate('change', {
      target: { value: expectedNewNumberValue }
    })

    wrapper.find('input#password').simulate('change', {
      target: { value: 'a' }
    })

    wrapper.find('input#password').simulate('change', {
      target: { value: expectedNewPasswordValue }
    })

    // then
    const actualInputs = wrapper.find(FormInput)
    expect(actualInputs).toHaveLength(2)

    // Number input
    const actualNumberInput = actualInputs.filterWhere(
      input => input.prop('attributes').id === 'number'
    )
    expect(actualNumberInput).toHaveLength(1)
    expect(actualNumberInput.prop('attributes').value).toBe(
      expectedNewNumberValue
    )
    const actualNumberInputErrors = actualNumberInput.prop('errors')
    expect(actualNumberInputErrors).toHaveLength(2)
    expect(actualNumberInputErrors).toContain('Should be numeric')
    expect(actualNumberInputErrors).toContain('Max length is 9')

    // Password input
    const actualPasswordInput = actualInputs.filterWhere(
      input => input.prop('attributes').id === 'password'
    )
    expect(actualPasswordInput).toHaveLength(1)
    expect(actualPasswordInput.prop('attributes').value).toBe(
      expectedNewPasswordValue
    )
    const actualPasswordInputErrors = actualPasswordInput.prop('errors')
    expect(actualPasswordInputErrors).toHaveLength(1)
    expect(actualPasswordInputErrors).toContain('Password is required')

    // Button
    const actualButton = wrapper.find('button')
    expect(actualButton).toHaveLength(1)
    expect(actualButton.prop('disabled')).toBe(true)
  })
})

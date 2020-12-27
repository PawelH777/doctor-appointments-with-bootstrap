import React from 'react'
import { configure, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Form from './Form'
import FormInput from '../../components/FormInput/FormInput'
import { NumberDataModel } from '../../data/stateDataModels/NumberDataModel'
import { ContentDataModel } from '../../data/stateDataModels/ContentDataModel'

configure({ adapter: new Adapter() })

describe('<Form />', () => {
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

    let actualContentInput = actualInputs.filterWhere(
      input => input.prop('attributes').id === 'Content'
    )
    expect(actualContentInput).toHaveLength(1)
    expect(actualContentInput.prop('label')).toBe(expectedContentLabel)
    expect(actualContentInput.prop('attributes')).toBe(
      expectedContentAttributes
    )

    let actualNumberInput = actualInputs.filterWhere(
      input => input.prop('attributes').id === 'number'
    )
    expect(actualNumberInput).toHaveLength(1)
    expect(actualNumberInput.prop('label')).toBe(expectedNumberLabel)
    expect(actualNumberInput.prop('attributes')).toBe(expectedNumberAttributes)

    const actualButton = wrapper.find('button')
    expect(actualButton).toHaveLength(1)
    expect(actualButton.prop('disabled')).toBe(true)
  })

  it('should change state of number and content inputs and pass the validation', () => {
    // given
    const contentModel = new ContentDataModel()
    const numberModel = new NumberDataModel()
    const formInputs = {
      content: contentModel,
      number: numberModel
    }

    // when
    const wrapper = mount(<Form inputs={formInputs} submitted={null} />)
    wrapper.update()

    wrapper.find('textarea#Content').simulate('change', {
      target: { value: 'Test content' }
    })

    wrapper.find('input#number').simulate('change', {
      target: { value: '111222333' }
    })

    // then
    // Passing the values to FormInput child component and rendering elements was
    // checked in the first test. This test is focused on state
    const actualInputsFromState = wrapper.state()
    expect(actualInputsFromState.inputs.content.attributes.value).toBe(
      'Test content'
    )
    expect(actualInputsFromState.inputs.content.validation.errors).toHaveLength(
      0
    )
    expect(actualInputsFromState.inputs.number.attributes.value).toBe(
      '111222333'
    )
    expect(actualInputsFromState.inputs.number.validation.errors).toHaveLength(
      0
    )
    expect(actualInputsFromState.isFormValid).toBe(true)
  })

  it('should change state of number and content inputs and fail the validation', () => {
    // given
    const contentModel = new ContentDataModel()
    const numberModel = new NumberDataModel()
    const formInputs = {
      content: contentModel,
      number: numberModel
    }

    // when
    const wrapper = mount(<Form inputs={formInputs} submitted={null} />)
    wrapper.update()

    wrapper.find('input#number').simulate('change', {
      target: { value: 'not numeric' }
    })

    // then
    // Passing the values to FormInput child component and rendering elements was
    // checked in the first test. This test is focused on state
    const actualInputsFromState = wrapper.state()
    expect(actualInputsFromState.inputs.number.attributes.value).toBe(
      'not numeric'
    )
    const actualNumberErrorMessages =
      actualInputsFromState.inputs.number.validation.errors
    expect(actualNumberErrorMessages).toHaveLength(2)
    expect(actualNumberErrorMessages).toContain('Should be numeric')
    expect(actualNumberErrorMessages).toContain('Max length is 9')
    expect(actualInputsFromState.isFormValid).toBe(false)
  })
})

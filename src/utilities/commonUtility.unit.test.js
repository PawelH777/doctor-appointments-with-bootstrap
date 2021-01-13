import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

import { updateObject } from './commonUtility'

const EXPECTED_OBJECT = {
  propertyOne: 'this will be not updated',
  propertyTwo: 'this will be not updated',
  propertyThree: 'updated value'
}

describe('Appointment utilities unit tests', () => {
  it('should update object', () => {
    // given
    const objectWaitingForUpdate = {
      propertyOne: 'this will be not updated',
      propertyTwo: 'this will be not updated',
      propertyThree: 'this will be updated'
    }

    const objectWithNewValue = {
      propertyThree: 'updated value'
    }

    // when
    const actualObject = updateObject(
      objectWaitingForUpdate,
      objectWithNewValue
    )

    // then
    expect(actualObject).toMatchObject(EXPECTED_OBJECT)
  })
})

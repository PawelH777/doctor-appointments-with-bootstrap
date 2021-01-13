import reducer from './auth'
import * as actionTypes from '../actions/actionTypes'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false
    })
  })

  it('should change loading to true when authentication is starting', () => {
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false
        },
        { type: actionTypes.AUTH_START }
      )
    ).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: true
    })
  })

  it('should insert auth data and remove error when authentication succeeds', () => {
    const expectedToken = 'test token'
    const expectedUserId = 'test user id'
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: 'test error',
          loading: false
        },
        {
          type: actionTypes.AUTH_SUCCESS,
          idToken: expectedToken,
          userId: expectedUserId
        }
      )
    ).toEqual({
      token: expectedToken,
      userId: expectedUserId,
      error: null,
      loading: false
    })
  })

  it('should insert error info when authentication fails', () => {
    const expectedError = 'test error'
    expect(
      reducer(
        {
          token: null,
          userId: null,
          error: null,
          loading: false
        },
        {
          type: actionTypes.AUTH_FAIL,
          error: expectedError
        }
      )
    ).toEqual({
      token: null,
      userId: null,
      error: expectedError,
      loading: false
    })
  })

  it('should remove auth info when log out', () => {
    expect(
      reducer(
        {
          token: 'test token',
          userId: 'test user id',
          error: null,
          loading: false
        },
        {
          type: actionTypes.AUTH_LOGOUT
        }
      )
    ).toEqual({
      token: null,
      userId: null,
      error: null,
      loading: false
    })
  })
})

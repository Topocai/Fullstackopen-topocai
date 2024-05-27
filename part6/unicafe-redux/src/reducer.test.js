import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  const createAction = (type) => ({type})

  const createTest = (type) => {
    const state = initialState
    deepFreeze(state)

    const newState = counterReducer(state, createAction(type))
    const key = type.toLowerCase()
    expect(newState).toEqual({...state, [key]: state[key] + 1})
  }

  test('should return a proper initial state when called with undefined state', () => {
    const newState = counterReducer(undefined, {type: ' '})
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => createTest('GOOD'))
  test('ok is incremented', () => createTest('OK'))
  test('bad is incremented', () => createTest('BAD'))
})
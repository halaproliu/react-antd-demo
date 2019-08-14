import { isEmptyObj, isPlainObject } from '../utils/common'

it('isEmptyObj', () => {
  expect(isEmptyObj({})).toEqual(true)
  expect(isEmptyObj({ a: 1 })).toEqual(false)
})

it('isPlainObject', () => {
  expect(isPlainObject({})).toEqual(true)
  expect(isPlainObject(new Object())).toEqual(true)
  expect(isPlainObject(11)).toEqual(false)
  expect(isPlainObject('a')).toEqual(false)
})


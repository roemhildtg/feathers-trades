import assert from 'assert'
import { app } from '../../../src/app'

describe('items service', () => {
  it('registered the service', () => {
    const service = app.service('items')

    assert.ok(service, 'Registered the service')
  })
})

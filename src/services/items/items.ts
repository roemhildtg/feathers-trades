import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  itemsDataValidator,
  itemsQueryValidator,
  itemsResolver,
  itemsDataResolver,
  itemsQueryResolver,
  itemsExternalResolver
} from './items.schema'

import type { Application } from '../../declarations'
import { ItemsService, getOptions } from './items.class'

export * from './items.class'
export * from './items.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const items = (app: Application) => {
  // Register our service on the Feathers application
  app.use('items', new ItemsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'update', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('items').hooks({
    around: {
      all: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.validateQuery(itemsQueryValidator),
        schemaHooks.validateData(itemsDataValidator),
        schemaHooks.resolveQuery(itemsQueryResolver),
        schemaHooks.resolveData(itemsDataResolver)
      ]
    },
    after: {
      all: [schemaHooks.resolveResult(itemsResolver), schemaHooks.resolveExternal(itemsExternalResolver)]
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    items: ItemsService
  }
}

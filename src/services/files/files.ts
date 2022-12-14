import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  filesDataValidator,
  filesQueryValidator,
  filesResolver,
  filesDataResolver,
  filesQueryResolver,
  filesExternalResolver
} from './files.schema'

import type { Application } from '../../declarations'
import { FilesService, getOptions } from './files.class'

export * from './files.class'
export * from './files.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const files = (app: Application) => {
  // Register our service on the Feathers application
  app.use('files', new FilesService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['find', 'get', 'create', 'update', 'patch', 'remove'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('files').hooks({
    around: {
      all: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.validateQuery(filesQueryValidator),
        schemaHooks.validateData(filesDataValidator),
        schemaHooks.resolveQuery(filesQueryResolver),
        schemaHooks.resolveData(filesDataResolver)
      ]
    },
    after: {
      all: [schemaHooks.resolveResult(filesResolver), schemaHooks.resolveExternal(filesExternalResolver)]
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    files: FilesService
  }
}

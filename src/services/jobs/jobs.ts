import { authenticate } from '@feathersjs/authentication'

import { hooks as schemaHooks } from '@feathersjs/schema'

import {
  jobsDataValidator,
  jobsQueryValidator,
  jobsResolver,
  jobsDataResolver,
  jobsQueryResolver,
  jobsExternalResolver
} from './jobs.schema'

import type { Application } from '../../declarations'
import { JobsService, getOptions } from './jobs.class'

export * from './jobs.class'
export * from './jobs.schema'

// A configure function that registers the service and its hooks via `app.configure`
export const jobs = (app: Application) => {
  // Register our service on the Feathers application
  app.use('jobs', new JobsService(getOptions(app)), {
    // A list of all methods this service exposes externally
    methods: ['get', 'create'],
    // You can add additional custom events to be sent to clients here
    events: []
  })
  // Initialize hooks
  app.service('jobs').hooks({
    around: {
      all: [authenticate('jwt')]
    },
    before: {
      all: [
        schemaHooks.validateQuery(jobsQueryValidator),
        schemaHooks.validateData(jobsDataValidator),
        schemaHooks.resolveQuery(jobsQueryResolver),
        schemaHooks.resolveData(jobsDataResolver)
      ]
    },
    after: {
      all: [schemaHooks.resolveResult(jobsResolver), schemaHooks.resolveExternal(jobsExternalResolver)]
    },
    error: {
      all: []
    }
  })
}

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    jobs: JobsService
  }
}

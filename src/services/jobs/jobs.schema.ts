import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../schemas/validators'

// Main data model schema
export const jobsSchema = Type.Object(
  {
    id: Type.String(),
    name: Type.String(),
    data: Type.Record(
      Type.String(),
      Type.Any(),
    ),
    output: Type.Optional(
      Type.Record(
        Type.String(),
        Type.Any(),
      )
    ),
    /**
     * All jobs start out in the created state and become active when picked up for work. 
     * If job processing completes successfully, jobs will go to completed. If a job fails,
     * it will typcially enter the failed state. However, if a job has retry options configured, 
     * it will enter the retry state on failure instead and have a chance to re-enter active state. 
     * It's also possible for active jobs to become expired, which happens when job processing 
     * takes too long. Jobs can also enter cancelled state via cancel(id) or cancel([ids]).
     * All jobs that are completed, expired, cancelled or failed become eligible for archiving 
     * (i.e. they will transition into the archive state) after the configured archiveCompletedAfterSeconds 
     * time. Once archived, jobs will be automatically deleted by pg-boss after the configured deletion period.
     */
    state: Type.Optional(
      Type.Enum({
        created: 'created',
        active: 'active',
        completed: 'completed',
        failed: 'failed',
        retry: 'retry',
        cancelled: 'cancelled',
        expired: 'expired',
      })
    )
  },
  { $id: 'Jobs', additionalProperties: false }
)
export type Jobs = Static<typeof jobsSchema>
export const jobsResolver = resolve<Jobs, HookContext>({
  properties: {}
})

export const jobsExternalResolver = resolve<Jobs, HookContext>({
  properties: {}
})

// Schema for creating new entries
export const jobsDataSchema = Type.Pick(jobsSchema, ['data', 'name'], {
  $id: 'JobsData',
  additionalProperties: false
})
export type JobsData = Static<typeof jobsDataSchema>
export const jobsDataValidator = getDataValidator(jobsDataSchema, dataValidator)
export const jobsDataResolver = resolve<Jobs, HookContext>({
  properties: {}
})

// Schema for allowed query properties
export const jobsQueryProperties = Type.Pick(jobsSchema, ['id', 'data', 'name', 'output', 'state'], { additionalProperties: false })
export const jobsQuerySchema = querySyntax(jobsQueryProperties)
export type JobsQuery = Static<typeof jobsQuerySchema>
export const jobsQueryValidator = getValidator(jobsQuerySchema, queryValidator)
export const jobsQueryResolver = resolve<JobsQuery, HookContext>({
  properties: {}
})

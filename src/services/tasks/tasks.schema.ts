import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../schemas/validators'

// Main data model schema
export const tasksSchema = Type.Object(
  {
    id: Type.Number(),
    document_name: Type.String(),
    status: Type.Optional(Type.Enum({
      in_progress: 'in_progress',
      pending: 'pending',
      failed: 'failed',
      completed: 'completed',
    })),
  },
  { $id: 'Tasks', additionalProperties: false }
)
export type Tasks = Static<typeof tasksSchema>
export const tasksResolver = resolve<Tasks, HookContext>({
  properties: {}
})

export const tasksExternalResolver = resolve<Tasks, HookContext>({
  properties: {}
})

// Schema for creating new entries
export const tasksDataSchema = Type.Pick(tasksSchema, ['status', 'document_name'], {
  $id: 'TasksData',
  additionalProperties: false
})
export type TasksData = Static<typeof tasksDataSchema>
export const tasksDataValidator = getDataValidator(tasksDataSchema, dataValidator)
export const tasksDataResolver = resolve<Tasks, HookContext>({
  properties: {}
})

// Schema for allowed query properties
export const tasksQueryProperties = Type.Pick(tasksSchema, ['id', 'status', 'document_name'], { additionalProperties: false })
export const tasksQuerySchema = querySyntax(tasksQueryProperties)
export type TasksQuery = Static<typeof tasksQuerySchema>
export const tasksQueryValidator = getValidator(tasksQuerySchema, queryValidator)
export const tasksQueryResolver = resolve<TasksQuery, HookContext>({
  properties: {}
})

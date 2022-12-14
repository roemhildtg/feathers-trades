import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../schemas/validators'

// Main data model schema
export const filesSchema = Type.Object(
  {
    id: Type.Number(),
    text: Type.String()
  },
  { $id: 'Files', additionalProperties: false }
)
export type Files = Static<typeof filesSchema>
export const filesResolver = resolve<Files, HookContext>({
  properties: {}
})

export const filesExternalResolver = resolve<Files, HookContext>({
  properties: {}
})

// Schema for creating new entries
export const filesDataSchema = Type.Pick(filesSchema, ['text'], {
  $id: 'FilesData',
  additionalProperties: false
})
export type FilesData = Static<typeof filesDataSchema>
export const filesDataValidator = getDataValidator(filesDataSchema, dataValidator)
export const filesDataResolver = resolve<Files, HookContext>({
  properties: {}
})

// Schema for allowed query properties
export const filesQueryProperties = Type.Pick(filesSchema, ['id', 'text'], { additionalProperties: false })
export const filesQuerySchema = querySyntax(filesQueryProperties)
export type FilesQuery = Static<typeof filesQuerySchema>
export const filesQueryValidator = getValidator(filesQuerySchema, queryValidator)
export const filesQueryResolver = resolve<FilesQuery, HookContext>({
  properties: {}
})

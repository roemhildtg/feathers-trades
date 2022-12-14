import { resolve } from '@feathersjs/schema'
import { Type, getDataValidator, getValidator, querySyntax } from '@feathersjs/typebox'
import type { Static } from '@feathersjs/typebox'

import type { HookContext } from '../../declarations'
import { dataValidator, queryValidator } from '../../schemas/validators'

// Main data model schema
export const itemsSchema = Type.Object(
  {
    id: Type.Number(),
    label: Type.String(),
    description: Type.String(),
    price_estimate: Type.Number(),
  },
  { $id: 'Items', additionalProperties: false }
)
export type Items = Static<typeof itemsSchema>
export const itemsResolver = resolve<Items, HookContext>({
  properties: {}
})

export const itemsExternalResolver = resolve<Items, HookContext>({
  properties: {}
})

// Schema for creating new entries
export const itemsDataSchema = Type.Pick(itemsSchema, ['label', 'description', 'price_estimate'], {
  $id: 'ItemsData',
  additionalProperties: false
})
export type ItemsData = Static<typeof itemsDataSchema>
export const itemsDataValidator = getDataValidator(itemsDataSchema, dataValidator)
export const itemsDataResolver = resolve<Items, HookContext>({
  properties: {}
})

// Schema for allowed query properties
export const itemsQueryProperties = Type.Pick(itemsSchema, ['id', 'label', 'description', 'price_estimate'], { additionalProperties: false })
export const itemsQuerySchema = querySyntax(itemsQueryProperties)
export type ItemsQuery = Static<typeof itemsQuerySchema>
export const itemsQueryValidator = getValidator(itemsQuerySchema, queryValidator)
export const itemsQueryResolver = resolve<ItemsQuery, HookContext>({
  properties: {}
})

import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Items, ItemsData, ItemsQuery } from './items.schema'

export interface ItemsParams extends KnexAdapterParams<ItemsQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class ItemsService<ServiceParams extends Params = ItemsParams> extends KnexService<
  Items,
  ItemsData,
  ServiceParams
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'items'
  }
}

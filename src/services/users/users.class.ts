import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { User, UserData, UserQuery } from './users.schema'

export interface UserParams extends KnexAdapterParams<UserQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class UserService<ServiceParams extends Params = UserParams> extends KnexService<
  User,
  UserData,
  ServiceParams
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'users'
  }
}

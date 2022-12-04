import type { Params } from '@feathersjs/feathers'
import { KnexService } from '@feathersjs/knex'
import type { KnexAdapterParams, KnexAdapterOptions } from '@feathersjs/knex'

import type { Application } from '../../declarations'
import type { Tasks, TasksData, TasksQuery } from './tasks.schema'

export interface TasksParams extends KnexAdapterParams<TasksQuery> {}

// By default calls the standard Knex adapter service methods but can be customized with your own functionality.
export class TasksService<ServiceParams extends Params = TasksParams> extends KnexService<
  Tasks,
  TasksData,
  ServiceParams
> {}

export const getOptions = (app: Application): KnexAdapterOptions => {
  return {
    paginate: app.get('paginate'),
    Model: app.get('postgresqlClient'),
    name: 'tasks'
  }
}

import type { Id, NullableId, Params } from '@feathersjs/feathers'
import PgBoss from 'pg-boss'
import { app } from '../../app'

import type { Application } from '../../declarations'
import { logger } from '../../logger'
import type { Jobs, JobsData, JobsQuery } from './jobs.schema'

export interface JobsServiceOptions {
  app: Application
}

export interface JobsParams extends Params<JobsQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class JobsService {
  queue: PgBoss;
  constructor(public options: JobsServiceOptions) {
    logger.info({options})
      const queue = options.app.get('queue') as PgBoss;
      this.queue = queue;
  }

  // async find(_params?: JobsParams): Promise<Jobs[]> {
  //   return []
  // }

  async get(id: Id, _params?: JobsParams): Promise<Jobs> {
    return this.queue.getJobById(id as string) as unknown as Promise<Jobs>;
  }

  async create(data: JobsData, params?: JobsParams): Promise<Jobs>
  async create(data: JobsData[], params?: JobsParams): Promise<Jobs[]>
  async create(data: JobsData | JobsData[], params?: JobsParams): Promise<Jobs | Jobs[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }
    
    logger.info({msg: 'dispatching job', data})
    return this.queue.send(data.name, data.data)
    .then((result) => {
      return {
        id: result as string,
        name: data.name,
        data: data.data,
      }
    })
  }

  // async update(id: NullableId, data: JobsData, _params?: JobsParams): Promise<Jobs> {
  //   return {
  //     id: 0,
  //     ...data
  //   }
  // }

  // async patch(id: NullableId, data: JobsData, _params?: JobsParams): Promise<Jobs> {
  //   return {
  //     id: 0,
  //     ...data
  //   }
  // }

  // async remove(id: NullableId, _params?: JobsParams): Promise<Jobs> {
  //   return {
  //     id: 0,
  //     text: 'removed'
  //   }
  // }
}

export const getOptions = (app: Application) => {
  return { app }
}

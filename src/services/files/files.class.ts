import type { Id, NullableId, Params } from '@feathersjs/feathers'

import type { Application } from '../../declarations'
import type { Files, FilesData, FilesQuery } from './files.schema'

export interface FilesServiceOptions {
  app: Application
}

export interface FilesParams extends Params<FilesQuery> {}

// This is a skeleton for a custom service class. Remove or add the methods you need here
export class FilesService {
  constructor(public options: FilesServiceOptions) {}

  async find(_params?: FilesParams): Promise<Files[]> {
    return []
  }

  async get(id: Id, _params?: FilesParams): Promise<Files> {
    return {
      id: 0,
      text: `A new message with ID: ${id}!`
    }
  }

  async create(data: FilesData, params?: FilesParams): Promise<Files>
  async create(data: FilesData[], params?: FilesParams): Promise<Files[]>
  async create(data: FilesData | FilesData[], params?: FilesParams): Promise<Files | Files[]> {
    if (Array.isArray(data)) {
      return Promise.all(data.map((current) => this.create(current, params)))
    }

    return {
      id: 0,
      ...data
    }
  }

  async update(id: NullableId, data: FilesData, _params?: FilesParams): Promise<Files> {
    return {
      id: 0,
      ...data
    }
  }

  async patch(id: NullableId, data: FilesData, _params?: FilesParams): Promise<Files> {
    return {
      id: 0,
      ...data
    }
  }

  async remove(id: NullableId, _params?: FilesParams): Promise<Files> {
    return {
      id: 0,
      text: 'removed'
    }
  }
}

export const getOptions = (app: Application) => {
  return { app }
}

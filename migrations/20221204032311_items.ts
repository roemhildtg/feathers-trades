import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('items', (table) => {
    table.increments('id')
    table.string('label')
    table.string('description')
    table.float('price_estimate')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('items')
}

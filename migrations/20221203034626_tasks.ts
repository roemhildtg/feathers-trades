import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('tasks', (table) => {
    table.increments('id')
    table.string('document_name')
    table.enum('status', ['pending', 'in_progress', 'completed', 'failed'])
    table.string('error');
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('tasks')
}

export async function up(knex) {
  return knex.schema.createTable('waitlist', table => {
    table.string('name')
    table.string('email').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
  })
}

export async function down(knex) {
  return knex.schema.dropTable('waitlist')
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('items', function(table) {
    table.increments('id').primary();
    table.integer('UserId').unsigned();
    table.string('Item_Name');
    table.string('Description');
    table.integer('Quality');

    // table.foreign('UserId').references('users.id');
  });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('items');
};
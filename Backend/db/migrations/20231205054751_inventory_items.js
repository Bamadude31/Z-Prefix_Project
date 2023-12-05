/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('items', table =>{
    table.increments('Id');
    table.string('First_Name').notNullable();
    table.string('Last_Name').notNullable();
    table.string('Username').notNullable();
    table.string('Password').notNullable();

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExist('items');
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('items', table =>{
    table.increments('Id');
    table.number('UserId').notNullable();
    table.number('Item_Name').notNullable();
    table.string('Description').notNullable();
    table.number('Quality').notNullable();

  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExist('items');
};


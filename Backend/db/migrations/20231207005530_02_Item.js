exports.up = function(knex) {
  return knex.schema.dropTableIfExists('items')
    .then(function() {
      return knex.schema.createTable('items', function(table) {
        table.increments('id').primary();
        table.integer('UserId').unsigned();
        table.string('Item_Name');
        table.string('Description');
        table.integer('Quality');

        // table.foreign('UserId').references('users.id');
      });
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('items');
};
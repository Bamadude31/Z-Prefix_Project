exports.up = function(knex) {
  return knex.schema.dropTableIfExists('user')
    .then(function() {
      return knex.schema.createTable('user', function(table) {
        table.increments('id').primary();
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.string('username');
        table.string('password');
      });
    });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('user');
};
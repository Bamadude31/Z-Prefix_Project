/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('user').del();
  // Inserts seed entries
  await knex('user').insert([
    { id: 1, first_name: 'John', last_name: 'Doe',email: 'johndoe@test.com', username: 'johndoe', password: 'password1' },
    { id: 2, first_name: 'Jane', last_name: 'Smith',email: 'janesmith@test.com', username: 'janesmith', password: 'password2' },
    { id: 3, first_name: 'Bob', last_name: 'Johnson',email: 'bjohnson@test.com', username: 'bjohnson', password: 'password3' }
  ])
  .onConflict(['id'])
    .ignore();
};


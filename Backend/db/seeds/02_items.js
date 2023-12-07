/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  await knex.schema.raw('TRUNCATE "user" CASCADE');
   // Deletes ALL existing entries
  await knex('users').del();
  await knex('items').del();
  // Inserts seed entries
  await knex('user').insert([
    { id: 1, first_name: 'John', last_name: 'Doe',email: 'johndoe@test.com', username: 'johndoe', password: 'password1' },
    { id: 2, first_name: 'Jane', last_name: 'Smith',email: 'janesmith@test.com', username: 'janesmith', password: 'password2' },
    { id: 3, first_name: 'Bob', last_name: 'Johnson',email: 'bjohnson@test.com', username: 'bjohnson', password: 'password3' }
  ])
  .onConflict(['id'])
  .ignore();
  await knex('items').insert([
    { id: 1, UserId: 1, Item_Name: 'Item 1', Description: 'Description 1', Quality: 1 },
    { id: 2, UserId: 2, Item_Name: 'Item 2', Description: 'Description 2', Quality: 2 },
    { id: 3, UserId: 3, Item_Name: 'Item 3', Description: 'Description 3', Quality: 3 }
  ])
  .onConflict(['id'])
    .ignore();
};

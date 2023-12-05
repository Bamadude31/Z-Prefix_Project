/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert([
    {id: 1, UserId: '123', Item_Name: '1234', Description: 'This is an items', Quality: '15'},
    {id: 2, UserId: '123', Item_Name: '1234', Description: 'This is an items', Quality: '15'},
    {id: 3, UserId: '123', Item_Name: '1234', Description: 'This is an items', Quality: '15'},
  ]);
};

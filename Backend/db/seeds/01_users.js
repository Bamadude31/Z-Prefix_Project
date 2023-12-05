
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, First_Name: 'John', Last_Name: 'Smith', Username: 'jsmith',Password: "password"},
    {id: 2, First_Name: 'Robert', Last_Name: 'Smith', Username: 'rsmith',Password: "password"},
    {id: 3, First_Name: 'Sarah', Last_Name: 'Smith', Username: 'ssmith',Password: "password"},
    {id: 4, First_Name: 'Bill', Last_Name: 'Smith', Username: 'bsmith',Password: "password"},
    {id: 5, First_Name: 'Mike', Last_Name: 'Smith', Username: 'msmith',Password: "password"},

  ]);
};


// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost/inventory',
    migrations: {
      directory: _dirname + '/db/migrations',
    },
    seeds: {
      directory: _dirname + '/db/seeds',
    },
      database: 'my_db',
      user:     'username',
      password: 'password',
    pool: {
      min: 2,
      max: 10
    },
  },

  production:  { client: 'pg',
    connection: process.env.DATABASE_URL,
  migrations: {
    directory: _dirname + '/db/migrations',
  },
  seeds: {
    directory: _dirname + '/db/seeds',
  },
    database: 'my_db',
    user:     'username',
    password: 'password',
  pool: {
    min: 2,
    max: 10
    },
  },
};

// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://postgres:docker@localhost/items',
    database: "items",
    user: "postgres",
    password: "docker",
    migrations: {
      getNewMigrationName: (name) => {
        return `${+new Date()}-${name}.js`;
      }
    }
  },
  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations:
  {
    tableName: 'knex_migrations'
  },
  production: {
    client: "pg",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    migrations: {
      getNewMigrationName: (name) => {
        return `${+new Date()}-${name}.js`;
      }
    }
  }
},
}
// Update with your config settings.


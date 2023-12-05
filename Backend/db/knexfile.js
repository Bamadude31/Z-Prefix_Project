
module.exports = {
    development: {
      client: "pg",
      migrations: {
        getNewMigrationName: (name) => {
          return `${+new Date()}-${name}.js`;
        }
      },
      connection: "postgres://postgres:docker@localhost/movies",
    },

    staging: {
      client: "pg",
      migrations: {
        getNewMigrationName: (name) => {
          return `${+new Date()}-${name}.js`;
        }
      },
      connection: {
        host: "localhost",
        port: 5432,
        database: "movies",
        user: "postgres",
        password: "docker",
      },
    },

    production: {
      client: "pg",
      migrations: {
        getNewMigrationName: (name) => {
          return `${+new Date()}-${name}.js`;
        }
      },
      connection: {
        database: "my_db",
        user: "username",
        password: "password",
      },
    },
  };



module.exports = {
  development: {
    client: "pg",
    connection: "postgres://localhost/postgres",
    migrations: {
      getNewMigrationName: (name) => {
        return `${+new Date()}-${name}.js`;
      }
    }
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
};
module.exports = {
  //Connection to database
    development: {
      client: 'mysql',
      connection: {
        database: 'car_project',
        user:     'root',
        password: 'sml12345'
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },
  };
  
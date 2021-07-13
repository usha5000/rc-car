module.exports = {
  //Connection to database
    development: {
      client: 'mysql',
      connection: {
        database: 'car_project',
        user:     'root',
        password: 'root'
      },
      migrations: {
        tableName: 'knex_migrations'
      }
    },
  };
  
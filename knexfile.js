// Update with your config settings.

module.exports = {
  client: 'postgresql',
    connection: {
      database: 'exercises-cap-4',
      user:     'postgres',
      password: 'postgrespw',
      port: 55000,
    },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
};

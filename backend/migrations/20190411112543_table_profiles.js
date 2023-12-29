
exports.up = function(knex, Promise) {
  return knex.schema.createTable('profiles', table => {
      table.increments('id').primary()
      table.string('name').notNull().unique()
      table.string('label').notNull()
  })
  .then(function () {
      return knex('profiles').insert([
          { name: 'admin', label: 'Administrator' },
          { name: 'master', label: 'Master' },
          { name: 'common', label: 'Common' },
      ])
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('profiles')
};

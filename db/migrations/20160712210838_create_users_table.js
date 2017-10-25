exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary();
      table.string('user_name');
      table.string('email_address');
    }),
    knex.schema.createTable('maps', function (table) {
      table.increments('id').primary();
      table.string('name');
    }),
    knex.schema.createTable('cont_list', function (table) {
      table.increments('id').primary();
      table.bigInteger('map_id').unsigned().index().references('id').inTable('maps');
      table.bigInteger('user_id').unsigned().index().references('id').inTable('users');
    }),
    knex.schema.createTable('like_list', function (table) {
      table.increments('id').primary();
      table.bigInteger('map_id').unsigned().index().references('id').inTable('maps');
      table.bigInteger('user_id').unsigned().index().references('id').inTable('users');
    }),
    knex.schema.createTable('points', function (table) {
      table.increments('id').primary();
      table.float('lat', 14, 10).notNullable();
      table.float('lng', 14, 10).notNullable();
      table.bigInteger('map_id').unsigned().index().references('id').inTable('maps');
      table.string('title');
      table.string('description');
      table.string('image');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),
    knex.schema.dropTable('maps'),
    knex.schema.dropTable('cont_list'),
    knex.schema.dropTable('like_list'),
    knex.schema.dropTable('points')
  ]);
};

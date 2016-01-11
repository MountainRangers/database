exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists('users', function(table) {
      table.increments('id').primary();
      table.date('date_joined');
      table.string('username', 20);
      table.string('google_id');
      table.string('photo_url', 500);
      table.text('personal_info');
    }),
    knex.schema.createTableIfNotExists('posts', function(table) {
      table.increments('id').primary();
      table.dateTime('date_posted');
      table.string('title');
      table.text('body');
      table.string('latitude');
      table.string('longitude');
      table.integer('user_id').references('id').inTable('users');
    }),
    knex.schema.createTableIfNotExists('tags', function(table) {
      table.increments('id').primary();
      table.string('name');
    }),
    knex.schema.createTableIfNotExists('posts_tags', function(table) {
      table.integer('post_id').references('id').inTable('posts');
      table.integer('tag_id').references('id').inTable('tags');
    })
  ]);
};



exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists('users'),
    knex.schema.dropTableIfExists('posts'),
    knex.schema.dropTableIfExists('tags'),
    knex.schema.dropTableIfExists('posts_tags')
  ]);
};

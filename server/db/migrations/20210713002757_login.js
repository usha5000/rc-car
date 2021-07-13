exports.up = function(knex) {
    return knex.schema.createTable('user', function(t) {
        t.increments('user_id').unsigned().primary()
        t.string('username')
        t.string('password')
    })
  }
  
  exports.down = function(knex) {
    return knex.schema.dropTable('user');
  }
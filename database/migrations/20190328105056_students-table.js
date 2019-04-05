exports.up = function(knex, Promise) {
  return knex.schema.createTable('students', function(table) {
    table.increments();
    table
      .string('name', 255)
      .notNullable()
      .unique("uq_student_name");
    table
      .integer('cohort_id')
      .notNullable()
      .references('id')
      .inTable('cohorts')
      .onDelete('CASCADE');
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('students');
};

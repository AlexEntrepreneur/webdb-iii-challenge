exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohorts', function(table) {
    table.increments();
    table
      .string('name', 255)
      .notNullable()
      .unique("uq_cohort_name");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('cohorts');
};

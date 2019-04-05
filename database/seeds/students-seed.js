
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {id: 1, cohort_id: 4, name: 'Student Name 1'},
        {id: 2, cohort_id: 2, name: 'Student Name 2'},
        {id: 3, cohort_id: 1, name: 'Student Name 3'}
      ]);
    });
};

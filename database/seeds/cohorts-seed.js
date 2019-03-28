
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').del()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {id: 1, name: 'WebEU1'},
        {id: 2, name: 'WebEU2'},
        {id: 3, name: 'WebEU3'},
        {id: 4, name: 'WebEU4'}
      ]);
    });
};

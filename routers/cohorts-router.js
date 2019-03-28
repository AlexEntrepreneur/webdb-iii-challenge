const express = require("express");
const knex = require("knex");
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const Cohorts = db('cohorts');
const Students = db('students');
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  Cohorts.select('id', 'name')
  .then((cohortsArray) => {
    res.json(cohortsArray);
  })
  .catch((err) => {
    res.status(500).json({
      message: 'Server failed to retrieve cohorts.',
      serverMessage: `${err}`
    })
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Cohorts.where({ id }).select('id', 'name').first()
    .then((cohortObject) => {
      res.json(cohortObject)
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server failed to retrieve cohort of id ${id}.`,
        serverMessage: `${err}`
      })
    });
});

router.get("/:cohort_id/students", (req, res) => {
  const { cohort_id } = req.params;
  Students.where({ cohort_id }).select('id', 'name', 'cohort_id')
    .then((studentsObject) => {
      debugger
      res.json(studentsObject)
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server failed to retrieve students from cohort of id ${cohort_id}.`,
        serverMessage: `${err}`
      })
    });
});

router.post("/", (req, res) => {
  const { name } = req.body;
  const newCohortObject = { name };
  Cohorts.insert(newCohortObject)
    .then((newCohortId) => {
      return Cohorts.select('id', 'name');
    })
    .then((CohortsArray) => {
      res.json(CohortsArray);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Server failed to create a new cohort.',
        serverMessage: `${err}`
      })
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const newCohortObject = { name };
  Cohorts.where({ id }).update(newCohortObject)
    .then((updatedFieldsLength) => {
      return Cohorts.select('id', 'name');
    })
    .then((CohortsArray) => {
      res.json(CohortsArray);
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server failed to update cohort of id ${id}.`,
        serverMessage: `${err}`
      })
    });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Cohorts.where({ id }).del()
    .then((deletedFieldsLength) => {
      return Cohorts.select('id', 'name');
    })
    .then((CohortsArray) => {
      res.json(CohortsArray);
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server failed to delete cohort of id ${id}.`,
        serverMessage: `${err}`
      })
    });
});

module.exports = router;

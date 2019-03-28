const express = require("express");
const knex = require("knex");
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const Students = db('students');
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  Students.select('id', 'name', 'cohort_id')
  .then((studentsArray) => {
    res.json(studentsArray);
  })
  .catch((err) => {
    res.status(500).json({
      message: 'Server failed to retrieve students.',
      serverMessage: `${err}`
    })
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Students.where({ id }).select('id', 'name', 'cohort_id').first()
    .then((studentObject) => {
      res.json(studentObject)
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server failed to retrieve student of id ${id}.`,
        serverMessage: `${err}`
      })
    });
});

router.post("/", (req, res) => {
  const { name, cohort_id } = req.body;
  const newStudentObject = { name, cohort_id };
  Students.insert(newStudentObject)
    .then((newStudentId) => {
      return Students.select('id', 'name', 'cohort_id');
    })
    .then((StudentsArray) => {
      res.json(StudentsArray);
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Server failed to create a new student.',
        serverMessage: `${err}`
      })
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { cohort_id } = req.body;
  const newStudentObject = { cohort_id };
  Students.where({ id }).update(newStudentObject)
    .then((updatedFieldsLength) => {
      return Students.select('id', 'name', 'cohort_id');
    })
    .then((StudentsArray) => {
      res.json(StudentsArray);
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server failed to update student of id ${id}.`,
        serverMessage: `${err}`
      })
    });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  Students.where({ id }).del()
    .then((deletedFieldsLength) => {
      return Students.select('id', 'name', 'cohort_id');
    })
    .then((StudentsArray) => {
      res.json(StudentsArray);
    })
    .catch((err) => {
      res.status(500).json({
        message: `Server failed to delete student of id ${id}.`,
        serverMessage: `${err}`
      })
    });
});

module.exports = router;

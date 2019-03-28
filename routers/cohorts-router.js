const express = require("express");
const knex = require("knex");
const knexConfig = require('../knexfile');
const db = knex(knexConfig.development);
const router = express.Router();

router.use(express.json());

router.get("/", (req, res) => {
  res.send('GET cohorts list');
});

router.get("/:id", (req, res) => {
  res.send('GET cohort');
});

router.get("/:id/students", (req, res) => {
  res.send('GET cohort students');
});

router.post("/", (req, res) => {
  res.send('POST cohort');
});

router.put("/:id", (req, res) => {
  res.send('UPDATE cohort');
});

router.delete("/:id", async (req, res) => {
  res.send('DELETE cohort');
});

module.exports = router;

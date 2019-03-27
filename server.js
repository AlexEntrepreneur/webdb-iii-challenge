const express = require("express");
const cohortRoutes = require("./routers/cohort-router.js");
const server = express();

server.use(express.json());

server.use("/api/cohorts", cohortRoutes);

module.exports = server;

const express = require("express");
const cohortsRoutes = require("./routers/cohorts-router.js");
const studentsRoutes = require("./routers/students-router.js");
const server = express();

server.use(express.json());

server.use("/api/cohorts", cohortsRoutes);
server.use("/api/students", studentsRoutes);

module.exports = server;

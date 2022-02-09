const assignmentsRouter = require("express").Router();
const Assignments = require("../models/Assignments");

//Get All
assignmentsRouter.get("/", async (req, res) => {});

//Get Single record
assignmentsRouter.get("/:id", async (req, res) => {});

//Create a record
assignmentsRouter.post("/", async (req, res) => {});

//Update a record
assignmentsRouter.put("/:id", async (req, res) => {});

//Delete a record
assignmentsRouter.delete("/:id", async (req, res) => {});

module.exports = assignmentsRouter;
    
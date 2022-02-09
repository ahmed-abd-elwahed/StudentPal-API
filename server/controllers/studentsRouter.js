const studentsRouter = require("express").Router();
const Students = require("../models/Students");

//Get All
studentsRouter.get("/", async (req, res) => {});

//Get Single record
studentsRouter.get("/:id", async (req, res) => {});

//Create a record
studentsRouter.post("/", async (req, res) => {});

//Update a record
studentsRouter.put("/:id", async (req, res) => {});

//Delete a record
studentsRouter.delete("/:id", async (req, res) => {});

module.exports = studentsRouter;
    
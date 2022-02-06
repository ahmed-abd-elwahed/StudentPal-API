const coursesRouter = require("express").Router();
const Courses = require("../models/Courses");

//Get All
coursesRouter.get("/", async (req, res) => {});

//Get Single record
coursesRouter.get("/:id", async (req, res) => {});

//Create a record
coursesRouter.post("/", async (req, res) => {});

//Update a record
coursesRouter.put("/:id", async (req, res) => {});

//Delete a record
coursesRouter.delete("/:id", async (req, res) => {});

module.exports = coursesRouter;
    
const students_coursesRouter = require("express").Router();
const Students_courses = require("../models/Students_courses");

//Get All
students_coursesRouter.get("/", async (req, res) => {});

//Get Single record
students_coursesRouter.get("/:id", async (req, res) => {});

//Create a record
students_coursesRouter.post("/", async (req, res) => {});

//Update a record
students_coursesRouter.put("/:id", async (req, res) => {});

//Delete a record
students_coursesRouter.delete("/:id", async (req, res) => {});

module.exports = students_coursesRouter;
    
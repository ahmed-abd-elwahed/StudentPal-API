const facultiesRouter = require("express").Router();
const Faculties = require("../models/Faculties");

//Get All
facultiesRouter.get("/", async (req, res) => {});

//Get Single record
facultiesRouter.get("/:id", async (req, res) => {});

//Create a record
facultiesRouter.post("/", async (req, res) => {});

//Update a record
facultiesRouter.put("/:id", async (req, res) => {});

//Delete a record
facultiesRouter.delete("/:id", async (req, res) => {});

module.exports = facultiesRouter;
    
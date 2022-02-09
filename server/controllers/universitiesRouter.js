const universitiesRouter = require("express").Router();
const Universities = require("../models/Universities");

//Get All
universitiesRouter.get("/", async (req, res) => {});

//Get Single record
universitiesRouter.get("/:id", async (req, res) => {});

//Create a record
universitiesRouter.post("/", async (req, res) => {});

//Update a record
universitiesRouter.put("/:id", async (req, res) => {});

//Delete a record
universitiesRouter.delete("/:id", async (req, res) => {});

module.exports = universitiesRouter;
    
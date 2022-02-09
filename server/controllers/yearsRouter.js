const yearsRouter = require("express").Router();
const Years = require("../models/Years");

//Get All
yearsRouter.get("/", async (req, res) => {});

//Get Single record
yearsRouter.get("/:id", async (req, res) => {});

//Create a record
yearsRouter.post("/", async (req, res) => {});

//Update a record
yearsRouter.put("/:id", async (req, res) => {});

//Delete a record
yearsRouter.delete("/:id", async (req, res) => {});

module.exports = yearsRouter;
    
const dataRouter = require("express").Router();
const Data = require("../models/Data");

//Get All
dataRouter.get("/", async (req, res) => {});

//Get Single record
dataRouter.get("/:id", async (req, res) => {});

//Create a record
dataRouter.post("/", async (req, res) => {});

//Update a record
dataRouter.put("/:id", async (req, res) => {});

//Delete a record
dataRouter.delete("/:id", async (req, res) => {});

module.exports = dataRouter;
    
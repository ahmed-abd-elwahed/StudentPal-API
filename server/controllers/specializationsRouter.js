const specializationsRouter = require("express").Router();
const Specializations = require("../models/Specializations");

//Get All
specializationsRouter.get("/", async (req, res) => {});

//Get Single record
specializationsRouter.get("/:id", async (req, res) => {});

//Create a record
specializationsRouter.post("/", async (req, res) => {});

//Update a record
specializationsRouter.put("/:id", async (req, res) => {});

//Delete a record
specializationsRouter.delete("/:id", async (req, res) => {});

module.exports = specializationsRouter;
    
const profilesRouter = require("express").Router();
const Profiles = require("../models/Profiles");

//Get All
profilesRouter.get("/", async (req, res) => {});

//Get Single record
profilesRouter.get("/:id", async (req, res) => {});

//Create a record
profilesRouter.post("/", async (req, res) => {});

//Update a record
profilesRouter.put("/:id", async (req, res) => {});

//Delete a record
profilesRouter.delete("/:id", async (req, res) => {});

module.exports = profilesRouter;
    
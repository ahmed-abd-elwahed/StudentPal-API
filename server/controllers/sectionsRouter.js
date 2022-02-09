const sectionsRouter = require("express").Router();
const Sections = require("../models/Sections");

//Get All
sectionsRouter.get("/", async (req, res) => {});

//Get Single record
sectionsRouter.get("/:id", async (req, res) => {});

//Create a record
sectionsRouter.post("/", async (req, res) => {});

//Update a record
sectionsRouter.put("/:id", async (req, res) => {});

//Delete a record
sectionsRouter.delete("/:id", async (req, res) => {});

module.exports = sectionsRouter;
    
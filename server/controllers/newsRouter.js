const newsRouter = require("express").Router();
const News = require("../models/News");

//Get All
newsRouter.get("/", async (req, res) => {});

//Get Single record
newsRouter.get("/:id", async (req, res) => {});

//Create a record
newsRouter.post("/", async (req, res) => {});

//Update a record
newsRouter.put("/:id", async (req, res) => {});

//Delete a record
newsRouter.delete("/:id", async (req, res) => {});

module.exports = newsRouter;
    
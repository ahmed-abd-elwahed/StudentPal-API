const usersRouter = require("express").Router();
const Users = require("../models/users");

//Get All
usersRouter.get("/", async (req, res) => {});

//Get Single record
usersRouter.get("/:id", async (req, res) => {});

//Create a record
usersRouter.post("/", async (req, res) => {});

//Update a record
usersRouter.put("/:id", async (req, res) => {});

//Delete a record
usersRouter.delete("/:id", async (req, res) => {});

module.exports = usersRouter;
    
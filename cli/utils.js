const fs = require("fs");
const { dirname } = require("path");
const capitalize = (text) => {
  return text[0].toUpperCase() + text.substring(1);
};

const makeRouterName = (text) => {
  return `${text}Router`;
};

const createModel = (name, columns) => {
  let fileName = `${capitalize(name)}.js`;
  let insertColumns = `${name}(${columns.map((column) => column)})`;
  let insertValues = `VALUES(${columns.map(
    (column, index) => `$${index + 1}`
  )})`;
  let updateStatement = `${columns.map(
    (column, index) => `${column}=$${index + 1}`
  )}`;
  let modelText = `class ${capitalize(name)} {
  tableName = "${name}"

  static getAll(){
    return \`SELECT * FROM ${name}\`
  }
    
  static getOne(){
    return \`SELECT * FROM ${name} WHERE id = $1\`
  }

  static insert(){
    return \`INSERT INTO ${insertColumns} ${insertValues}\`
  }


  static update(){
    return \`UPDATE ${name} SET ${updateStatement} WHERE id=$${
    columns.length + 1
  }\`
  }

  static delete(){
    return \`DELETE FROM ${name} WHERE id=$1\`
  }
}

module.exports = ${capitalize(name)}
    
    `;
  fs.writeFile(`./models/${fileName}`, modelText, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

const createController = (text) => {
  let fileName = `${makeRouterName(text)}.js`;
  let controllerText = `const ${makeRouterName(
    text
  )} = require("express").Router();
const ${capitalize(text)} = require("../models/${capitalize(text)}");

//Get All
${makeRouterName(text)}.get("/", async (req, res) => {});

//Get Single record
${makeRouterName(text)}.get("/:id", async (req, res) => {});

//Create a record
${makeRouterName(text)}.post("/", async (req, res) => {});

//Update a record
${makeRouterName(text)}.put("/:id", async (req, res) => {});

//Delete a record
${makeRouterName(text)}.delete("/:id", async (req, res) => {});

module.exports = ${makeRouterName(text)};
    `;
  fs.writeFile(`./controllers/${fileName}`, controllerText, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
};

module.exports = {
  createController,
  createModel,
};

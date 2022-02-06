/* eslint-disable max-len */
const usersRouter = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { Authenticate } = require('../utils/auth');

/**
 * @swagger
 * components:
 *  responses:
 *      UnauthorizedError:
 *          description: Access token is missing or invalid
 *  securitySchemes:
 *      bearerAuth:
 *          type: http
 *          scheme: bearer
 *          bearerFormat: JWT
 *  schemas:
 *      Drawing:
 *          type: object
 *          required:
 *              - title
 *              - drawing
 *          properties:
 *              id:
 *                  type: string
 *                  description: id of the drawing
 *              title:
 *                  type: string
 *                  description: name of the drawing
 *              drawing:
 *                  type: string
 *                  description: the drawing canvas saved as text
 *              likes:
 *                  type: array
 *                  items:
 *                      type: string
 *                      description: ids of users who liked this drawing
 *              user:
 *                  type: string
 *                  description: id of the user who created this drawing
 *          example:
 *              id: 6199a14c96fa7d310566bfe7
 *              title: my first drawing
 *              drawing: 6199a14c96fa7d310566bfe76199a14c96fa7d310566bfe76199a14c
 *              likes: ['6199a14c96fa7d310566bfe7','6199a14c96fa7d310566bfe7']
 *      User:
 *          type: object
 *          required:
 *              - username
 *              - name
 *          properties:
 *              id:
 *                  type: string
 *                  description: The id of the book
 *              username:
 *                  type: string
 *                  description: username of the user that is used to login
 *              name:
 *                  type: string
 *                  description: the displaying name of the user
 *              drawings:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/Drawing"
 *              liked:
 *                  type: array
 *                  items:
 *                      type: string
 *                      description: list of liked drawings ids
 *          example:
 *              id: 6199a14c96fa7d310566bfe7
 *              username: testuser123
 *              name: Test User
 *              liked: ['6199a14c96fa7d310566bfe7','6199a14c96fa7d310566bfe7']
 *
 *
 *
 */

/**
 * @swagger
 * security:
 *  - bearerAuth: []
 */

/**
 * @swagger
 * tags:
 *  - name: Users
 *    description: Users endpoint
 *  - name: Drawings
 *    description: Drawings endpoint
 */

/**
 * @swagger
 * /api/users:
 *  get:
 *      summary: Returns list of all users
 *      tags: [Users]
 *      responses:
 *          200:
 *              description: list of users
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 *
 */
usersRouter.get('/', async (req, res) => {
  // Make request to the database to get all users
  const users = await User.find({}).populate('drawings');

  // Return the users as json

  res.json(users);
});

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *      summary: Get specific user
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *      responses:
 *          200:
 *              description: user object retrived succesfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          404:
 *              description: user was not found
 *
 */
usersRouter.get('/:id', async (req, res) => {
  const userId = req.params.id.toString();
  const user = await User.findById({ _id: userId });
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).end();
  }
});

// usersRouter.delete('/:id',async (req,res) => {
//     //See wether the user with this ID exists or not
//     const deletedUser = await User.findByIdAndDelete(req.params.id)
//     if(deletedUser){
//         res.status(204).end()
//     }

//     res.status(204).json({"error":"Delete Failed"})
// })

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *      summary: Update user personal data name and image
 *      tags: [Users]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *            description: id of the user that needs to be updated
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  description: new name of user if he wants to update it
 *                              image:
 *                                  type: string
 *                                  description: image string as filebase64
 *      responses:
 *          200:
 *              description: content was updated succefullly
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          401:
 *              description: User Unauthorized or invalid token
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          description: error unauthorized user
 *                      example:
 *                          {"error":"Invalid Token"}
 */
usersRouter.put('/:id', Authenticate, async (req, res) => {
  const userId = res.locals.user.toString();
  const { body } = req;
  const user = await User.findById({ _id: userId });
  const isOwner = req.params.id.toString() === userId;

  if (isOwner) {
    if (body.name) {
      user.name = body.name;
    }

    if (body.image) {
      user.image = body.image;
    }

    await user.save();

    res.status(200).json(user);
  } else {
    res.status(401).end();
  }
});

/**
 * @swagger
 * /api/users:
 *  post:
 *      summary: Register new user
 *      tags: [Users]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - username
 *                          - name
 *                          - pass
 *                      properties:
 *                          username:
 *                              type: string
 *                              description: the username which he would use to login
 *                          name:
 *                              type: string
 *                              description: the name which would be shown to users
 *                          pass:
 *                              type: string
 *                              description: user password
 *                  example:
 *                      {"username":"testuser222","name":"Potato User","pass":"VerySecret#password"}
 *      responses:
 *          200:
 *              description: user was registered succefully
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: duplicated username error
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  description: error for duplicated username
 *                      example:
 *                          { "error": "E11000 duplicate key error collection: drawing-app.users index: username_1 dup key: { username: \"testuser222\" }" }
 *          403:
 *              description: Invalid password
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                      example: {"error":"Password is less than 3 characters"}
 *
 *
 *
 */
// eslint-disable-next-line consistent-return
usersRouter.post('/', async (req, res) => {
  // Get information and make a model to save in the database as a user

  const { username, name, pass } = req.body;

  // Hash the password using bcrypt
  const saltNmber = 10;
  if (pass.length <= 3) {
    return res.status(403).json({ error: 'Password is less than 3 characters' }).end();
  }
  const password = await bcrypt.hash(pass, saltNmber);

  // Make an obejct of the User model
  const user = new User({
    username,
    password,
    name,
  });

  // Wait for the saved user

  const savedUser = await user.save();

  // return the saved uer as json

  res.json(savedUser);
});

module.exports = usersRouter;

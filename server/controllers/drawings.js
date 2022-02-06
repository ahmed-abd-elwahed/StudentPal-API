/*
eslint linebreak-style: ["error", "windows"]
*/
const drawingRouter = require('express').Router();
const Drawing = require('../models/drawing');
const User = require('../models/user');
const { Authenticate } = require('../utils/auth');

drawingRouter.get('/', async (request, response) => {
  const drawings = await Drawing.find({}).populate('user');
  response.json(drawings);
});

drawingRouter.get('/user/:id/', async (request, response) => {
  const userId = request.params.id.toString();
  const drawings = await Drawing.find({ user: userId }).populate('user');
  response.json(drawings);
});

drawingRouter.get('/:id', async (req, res) => {
  const drawingId = req.params.id.toString();
  const drawing = await Drawing.findById({ _id: drawingId });
  if (drawing) {
    res.status(200).json(drawing);
  } else {
    res.status(404).end();
  }
});

drawingRouter.delete('/:id', Authenticate, async (request, response) => {
  const drawingId = request.params.id.toString();
  const userId = response.locals.user.toString();
  const drawing = await Drawing.findById({ _id: drawingId });
  const user = await User.findById({ _id: userId });
  const isOwner = drawing.user.equals(user._id);

  if (user && drawing && isOwner) {
    await drawing.remove();
    user.drawings = user.drawings.filter((item) => item.toString() !== drawingId);

    await user.save();

    response.status(204).end();
  } else {
    response.status(403).end();
  }
});

drawingRouter.put('/:id', Authenticate, async (request, response) => {
  const drawingId = request.params.id.toString();
  const userId = response.locals.user.toString();
  const drawing = await Drawing.findById({ _id: drawingId });
  const user = await User.findById({ _id: userId });
  const isOwner = drawing.user.equals(user._id);

  const { body } = request;

  if (user && drawing) {
    if (!body.title) {
      const isLiked = drawing.likes.some((like) => like.equals(user._id));
      if (isLiked) {
        drawing.likes = drawing.likes.filter((like) => !like.equals(user._id));
        user.liked = user.liked.filter((id) => !id.equals(drawing._id));
      } else {
        drawing.likes.push(userId);
        user.liked.push(drawingId);
      }
      await user.save();
      const newDrawing = await drawing.save();
      response.status(200).json(newDrawing);
    } else if (body.title && isOwner) {
      const { title, drawing: updatedDrawing, drawingImg } = body;
      drawing.title = title;
      drawing.drawing = updatedDrawing;
      drawing.drawingImg = drawingImg;
      const newDrawing = await drawing.save();
      response.status(200).json(newDrawing);
    }
  }
  response.status(401).json({
    error: 'token missing or invalid',
  });
});

drawingRouter.post('/', Authenticate, async (request, response) => {
  const { body } = request;

  const userID = response.locals.user;
  if (!userID) {
    response.status(401).json({
      error: 'token missing or invalid',
    });
  }

  const user = await User.findById(userID);
  const drawing = new Drawing({
    title: body.title,
    drawing: body.drawing,
    drawingImg: body.drawingImg,
    user: user._id,
    likes: [],

  });

  const savedDrawing = await drawing.save();

  user.drawings = user.drawings.concat(savedDrawing._id);
  await user.save();

  response.json(savedDrawing);
});

module.exports = drawingRouter;

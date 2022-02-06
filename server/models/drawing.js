/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const drawingSchema = new mongoose.Schema({
  title: String,
  drawing: String,
  drawingImg: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],

});

drawingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();

    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Drawing', drawingSchema);

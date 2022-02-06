const express = require('express');
require('express-async-errors');

const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const logger = require('./utils/logger');
const config = require('./utils/config');
const drawingsRouter = require('./controllers/drawings');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');
const swaggerSpec = require('./docs/swaggerSpec');

logger.info('Connecting to the database...');

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to the database succefully!');
  })
  .catch((err) => {
    logger.error(`erro occured ${err.message}`);
  });

app.use(cors());
app.use(express.json({ limit: '10MB' }));
app.use(middleware.requestLogger);
app.use('/api/drawings', drawingsRouter);
app.use('/api/login', loginRouter);

app.use('/api/users', usersRouter);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;

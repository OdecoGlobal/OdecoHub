const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
// app.use(require('express-blocks'));

const userRouter = require('./routes/userRoutes');

// Initializing the app
const app = express();

// Data Sanitaization
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());
// ADDING TIME TO THE REQ OBJECT
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  // console.log(req.cookies);
  next();
});

// MIDDLEWARES
// Morgan logger
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// BODY PARSER
app.use(express.json({ limit: '10kb' }));
// COOKIE PARSER
app.use(cookieParser());

// ROUTES
app.use('/api/v1/users', userRouter);

module.exports = app;

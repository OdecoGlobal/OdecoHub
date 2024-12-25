const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
// app.use(require('express-blocks'));

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/userRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');

// Initializing the app
const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
// app.enable('trust proxy');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// GLOAL MIDDLE WARE
app.use(express.static(path.join(__dirname, 'public')));

// Set security HTTP headers
app.use(helmet());

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// Data Sanitaization
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// COMPRESSION
app.use(compression());

// ADDING TIME TO THE REQ OBJECT
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
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

// Parameter Pollution
app.use(
  hpp({
    whitelist: ['price', 'category', 'ratingsQuantity', 'ratingsAverage'],
  })
);

// ROUTES
app.use('/api/v1/users', userRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/carts', cartRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

module.exports = app;

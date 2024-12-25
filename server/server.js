const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Handling Uncaught Exceptions
process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION!!💥💥 Shutting down...');
  process.exit(1);
});

// Init dotenv and app
dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection succesful'));

const port = process.env.PORT || 8080;
const server = app.listen(port, () => {
  console.log(`App running at port: ${port}`);
});

// Unhandled promise rejection
process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION!!💥💥 Shutting down...');
  server.close(() => process.exit(1));
});

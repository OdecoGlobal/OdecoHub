const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./../../models/userModel');
const Product = require('./../../models/productModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DB.replace('<DB_PASSWORD>', process.env.DB_PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB connection succesful'));

//Read Json file
const products = JSON.parse(
  fs.readFileSync(`${__dirname}/products.json`, 'utf-8')
);
const users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
// const reviews = JSON.parse(
//   fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8')
// );
// IMPORT DATA INTO DATABASE

const importData = async () => {
  try {
    await Product.create(products);
    await User.create(users, { validateBeforeSave: false });
    // await Review.create(reviews);
    console.log('Data succesfully loaded');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    // await Review.deleteMany();
    console.log('Data succesfully deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();

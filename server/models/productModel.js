const mongoose = require('mongoose');
const slugify = require('slugify');

// PRODUCT SCHEMA
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A product must have a name'],
      unique: true,
    },
    slug: String,
    price: {
      type: Number,
      required: [true, 'A product must have a price'],
    },
    stock: {
      type: Number,
      required: [true, 'A product must have a stock amount'],
    },

    priceDiscount: {
      type: Number,
      min: [0, 'Discount must be  positive'],
      max: [100, 'Discount msut not exceed 100'],
    },
    category: {
      type: String,
      required: [true, 'A producy must belong to a category'],
      enum: {
        values: [
          'Phone & Tablets',
          'Fashion',
          'Electronics',
          'Gaming',
          'Computing',
        ],
        message:
          'Catergory must either be Phone & Tablets, fashion, electronics gaming or computing',
      },
    },

    ratingsAverage: {
      type: Number,
      default: 4.0,
      min: [1, 'Ratings must be above 1.0'],
      max: [5, 'Ratings must be below 5.0'],
      set: val => Math.round(val * 10) / 10,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    summary: {
      type: String,
      required: [true, 'A product must have a summary'],
      minlength: [20, 'A summary must be greater than 20 characters'],
      trim: true,
    },

    description: {
      type: String,
      required: [true, 'Product description is required'],
      trim: true,
    },

    imageCover: {
      type: String,
      required: [true, 'Product must have an image cover'],
    },
    images: {
      type: [String],
      required: [true, 'Product must have at least one image'],
    },
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Each product must have a seller'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// QUERY MIDDLEWARW
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'seller',
    select: '-__v -passwordChangeAt',
  });
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;

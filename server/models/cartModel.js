const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Cart must belong to a user'],
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Cart must belong to a product'],
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [1, 'Quantity cannot be less than 1'],
      default: 1,
    },
  },
  { timestamps: true }
);

cartSchema.index({ user: 1, product: 1 });

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'product',
    select: 'id seller name imageCover price stock priceDiscount',
  });
  next();
});

cartSchema.methods.calculateTotal = async function () {
  const product = await mongoose.model('Product').findById(this.product);
  return this.quantity * product.price;
};

const Cart = mongoose.model('Cart', cartSchema);
module.exports = Cart;

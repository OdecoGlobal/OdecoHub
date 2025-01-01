const Cart = require('../models/cartModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllCart = factory.getAll(Cart);

exports.createCart = catchAsync(async (req, res, next) => {
  // if (!req.body.user) req.body.user = req.user.id;

  if (!req.body.product) {
    return next(new AppError('Product Id is required', 400));
  }

  // Check if product is alreay in user cart
  const existingCart = await Cart.findOne({
    product: req.body.product,
  });

  if (existingCart) {
    // Update Product quantity by one
    existingCart.quantity += req.body.quantity || 1;
    return res.status(200).json({
      status: 'success',
      data: { cart: existingCart },
    });
  }

  const newCart = await Cart.create(req.body);
  res.status(201).json({
    status: 'success',
    data: { cart: newCart },
  });
});

exports.updateCart = catchAsync(async (req, res, next) => {
  const cartItem = await Cart.findByIdAndUpdate(
    req.params.id,
    { quantity: req.body.quantity },
    { new: true, runValidators: true }
  );

  if (!cartItem) {
    return next(new AppError('No cart item found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { cart: cartItem },
  });
});

exports.deleteCart = factory.deleteOne(Cart);

exports.clearCart = catchAsync(async (req, res, next) => {
  await Cart.deleteMany({ user: req.user.id });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

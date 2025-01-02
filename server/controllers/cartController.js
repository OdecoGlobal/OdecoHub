const Cart = require('../models/cartModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllCart = factory.getAll(Cart);

exports.createCart = catchAsync(async (req, res, next) => {
  const user = req.user._id;

  const { product, quantity = 1 } = req.body;
  if (!product) {
    return next(new AppError('Product Id is required', 400));
  }

  const existingCart = await Cart.findOne({
    product,
    user,
  });

  if (existingCart) {
    existingCart.quantity += 1;
    await existingCart.save();
    return res.status(200).json({
      status: 'success',
      data: { cart: existingCart },
    });
  }

  const newCart = await Cart.create({
    user,
    product,
    quantity,
  });

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

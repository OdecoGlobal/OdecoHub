const express = require('express');
const authController = require('../controllers/authController');
const cartController = require('../controllers/cartController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('user'));

router
  .route('/')
  .get(cartController.getAllCart)
  .post(cartController.createCart)
  .delete(cartController.clearCart);

router
  .route('/:id')
  .patch(cartController.updateCart)
  .delete(cartController.deleteCart);

module.exports = router;

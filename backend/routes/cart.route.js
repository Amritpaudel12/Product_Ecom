
import express from 'express';
const router = express.Router();
import { addToCart, clearCart, removeFromCart, updateQuantity } from '../controllers/cart.controller.js'

router.route('/create-cart').post(addToCart);

router.route('/remove-cart').delete(removeFromCart);

router.route('/clear-cart').delete(clearCart);

router.route('/update-quantity').put(updateQuantity);

export default router;
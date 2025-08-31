import { Cart } from '../models/cart.model.js'; 
import mongoose from 'mongoose'
export const addToCart = async (req, res) => {
    const { userId, productId, name, image, price, quantity } = req.body;
    console.log("cart body ", req.body); 

    if (!userId || !productId || !name || !image || !price || !quantity) {
        return res.status(400).json({ message: 'Missing required product details or User ID.' });
    }

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity; 
            } else {
                cart.items.push({
                    productId, 
                    name,
                    image,
                    price,
                    quantity
                });
            }
            cart = await cart.save();
            return res.status(200).json(cart);
        } else {
            const newCart = await Cart.create({
                userId,
                items: [{
                    productId,
                    name,
                    image,
                    price,
                    quantity
                }]
            });
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error('Error adding to cart:', error);
        res.status(500).json({ message: 'Something went wrong.', error: error.message });
    }
};

export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'User ID and Product ID are required.' });
  }

  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId: new mongoose.Types.ObjectId(productId) } } },
      { new: true } 
    );

    if (!updatedCart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    return res.status(200).json({
      message: 'Item removed successfully.',
      cart: updatedCart
    });
  } catch (error) {
    console.error('Error removing item from cart:', error);
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
};



export const clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({});
    res.status(200).json({ message: 'All items removed from cart.' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ error: 'Failed to clear cart.' });
  }
};


export const updateQuantity = async (req, res) => {
  const { userId, productId, type } = req.body;

  if (!userId || !productId || !type) {
    return res.status(400).json({ message: 'Missing userId, productId, or update type.' });
  }

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found.' });
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: 'Product not found in cart.' });
    }

    if (type === 'increment') {
      cart.items[itemIndex].quantity += 1;
    } else if (type === 'decrement') {
      cart.items[itemIndex].quantity -= 1;

      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
    } else {
      return res.status(400).json({ message: 'Invalid update type. Use "increment" or "decrement".' });
    }

    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ message: 'Something went wrong.', error: error.message });
  }
};

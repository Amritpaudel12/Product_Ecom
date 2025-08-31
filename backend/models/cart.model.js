
import mongoose from 'mongoose' 

const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', 
        required: true,
    },
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
});

const cartSchema = new mongoose.Schema({
    userId: {
        type: String, 
        required: true,
        unique: true,
    },
    items: [cartItemSchema],
}, { timestamps: true });

export const Cart = mongoose.model('Cart', cartSchema);
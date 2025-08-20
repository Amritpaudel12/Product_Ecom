import { Schema, model } from 'mongoose';

const transactionSchema = new Schema({
    transactionId: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['success', 'failure', 'pending', 'Completed'],
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    orderName: {
        type: String,
        required: true
    },
    paymentDate: {
        type: Date,
        default: Date.now
    }
});

const Transaction = model('Transaction', transactionSchema);

export default Transaction;

import Transaction from '../models/payment.model.js';

const getPaymentDetails = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const transaction = await Transaction.findOne({ transactionId });

    if (transaction) {
      res.status(200).json(transaction);
    } else {
      res.status(404).json({ message: 'Transaction not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transaction details', error: error.message });
  }
};


const createPayment = async (req, res) => {
  console.log('Received payment data:', req.body);

  try {
    const { transactionId, amount, status, orderId, orderName } = req.body;
    if (!transactionId || !amount || !status || !orderId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newTransaction = new Transaction({
      transactionId,
      amount,
      status,
      orderId,
      orderName,
    });

    const savedTransaction = await newTransaction.save();
    console.log('Transaction saved successfully:', savedTransaction); 
 
    return res.status(201).json(savedTransaction);

  } catch (error) {

    console.error('Error caught while creating transaction:', error);

    return res.status(500).json({ message: 'Error creating transaction', error: error.message });
  }
};

export { createPayment, getPaymentDetails };
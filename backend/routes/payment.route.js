
import express from 'express';
import { createPayment, getPaymentDetails } from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/', createPayment);
router.get('/:transactionId', getPaymentDetails);

export default router;
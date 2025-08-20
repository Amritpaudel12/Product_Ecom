import express from 'express';
import { initiateKhaltiPayment, verifyKhaltiPayment } from '../controllers/khalti.controller.js';

const router = express.Router();


router.post('/initiate', initiateKhaltiPayment);

router.post('/verify', verifyKhaltiPayment);

export default router;
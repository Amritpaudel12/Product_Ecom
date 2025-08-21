import axios from 'axios';

export const initiateKhaltiPayment = async (req, res) => {
    const { orderId, orderName, amount } = req.body;

    if (!orderId || !orderName || !amount) {
        return res.status(400).json({ error: 'Missing required payment details: orderId, orderName, amount' });
    }

    try {
        const payload = {
            return_url: 'http://localhost:5173/payment-success', 
            website_url: 'http://localhost:5173', 
            amount: amount, 
            purchase_order_id: orderId,
            purchase_order_name: orderName,
            customer_info: {
                name: 'Test Customer',
                email: 'test@example.com',
                phone: '9800000000'
            }
        };

        const config = {
            headers: {
                'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`,
                'Content-Type': 'application/json',
            }
        };

        const response = await axios.post('https://a.khalti.com/api/v2/epayment/initiate/', payload, config);
        
        res.json({ success: true, payment_url: response.data.payment_url });

    } catch (error) {
        console.error('Error initiating Khalti payment:', error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, error: 'Failed to initiate payment. Please try again.' });
    }
};

export const verifyKhaltiPayment = async (req, res) => {
    const { pidx } = req.body; 

    if (!pidx) {
        return res.status(400).json({ error: 'Missing required verification detail: pidx' });
    }

    try {
        const payload = { pidx };

        const config = {
            headers: {
                'Authorization': `Key ${process.env.KHALTI_SECRET_KEY}`,
                'Content-Type': 'application/json',
            }
        };

        const response = await axios.post('https://a.khalti.com/api/v2/epayment/lookup/', payload, config);

        if (response.data.status === 'Completed') {
            console.log('Payment verification successful:', response.data);
            res.json({
                success: true,
                message: 'Payment verified successfully.',
                data: response.data
            });
        } else {
            console.warn('Payment verification failed or is pending:', response.data);
            res.status(400).json({
                success: false,
                message: `Payment status is: ${response.data.status}`,
            });
        }

    } catch (error) {
        console.error('Error verifying Khalti payment:', error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, error: 'Failed to verify payment.' });
    }
};
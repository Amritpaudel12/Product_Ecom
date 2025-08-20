import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { clearCart } from '../slice/cartSlice';
import { useEffect, useState, useRef } from 'react'; 
import toast, { Toaster } from 'react-hot-toast';

const PaymentSuccess = () => {
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const effectRan = useRef(false);

  const transactionId = queryParams.get('transaction_id');
  const amount = queryParams.get('amount');
  const status = queryParams.get('status');
  const orderId = queryParams.get('purchase_order_id');
  const orderName = queryParams.get('purchase_order_name');

  const isSuccess = status === 'success';

  useEffect(() => {
    if (effectRan.current === false) {
      const createPayment = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/payments', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              transactionId,
              amount,
              status,
              orderId,
              orderName,
            }),
          });
          
          if (!response.ok) {
            const errorData = await response.json(); 
            throw new Error(errorData.message || 'Failed to create payment');
          }

          toast.success('Payment created successfully!'); 
          dispatch(clearCart());

        } catch (error) {
          setError(error.message);
          toast.error('There was an error saving the payment.'); 
          console.error('Error creating payment:', error);
        } finally {
          setLoading(false);
        }
      };

      if (transactionId) { 
          createPayment();
      } else {
          setLoading(false);
          setError("Transaction details not found in URL.");
          toast.error("Could not find transaction details.");
      }

      return () => {
        effectRan.current = true;
      };
    }
  }, [dispatch, transactionId, amount, status, orderId, orderName]); 

   if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p>Processing your payment...</p>
      </div>
    );
  }

  if (error && !loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center">
           <h2 className="text-2xl font-bold text-red-500 mb-4">Payment Error</h2>
           <p className="text-gray-600">We encountered an issue while saving your payment details. Please contact support.</p>
           <p className="text-sm text-gray-500 mt-2">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Payment Details</h2>

        <div className="mb-6 text-center">
          <span
            className={`inline-block px-4 py-2 rounded-full text-white ${
              isSuccess ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {status}
          </span>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Transaction ID:</span>
            <span className="text-gray-800">{transactionId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Amount Paid:</span>
            <span className="text-gray-800">Rs. {amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Order ID:</span>
            <span className="text-gray-800">{orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold text-gray-600">Order Name:</span>
            <span className="text-gray-800">{orderName}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
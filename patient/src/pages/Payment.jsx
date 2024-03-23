import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [paymentInfo, setPaymentInfo] = useState({
    card_holder_name: '',
    card_number: '',
    cardcvv: '',
    card_expiry_date: '',
    amount: '',
  });

  const handlePaymentChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo({ ...paymentInfo, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/payments', {
        paymentInfo
      });
      console.log(response.data); // Handle response from the server
    } catch (error) {
      console.error('Error submitting payment:', error);
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <form onSubmit={handleSubmit} className="max-w-xl  bg-gray-400 p-10 mx-10 rounded shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold text-red-600 mb-4">Payment</h2>
            <div className="mb-4">
              <label htmlFor="card_holder_name" className="block text-sm font-medium text-gray-700">
                Name On Card:
              </label>
              <input type="text" id="card_holder_name" name="card_holder_name" placeholder="Enter card name" required value={paymentInfo.card_holder_name} 
              onChange={handlePaymentChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="card_number" className="block text-sm font-medium text-gray-700">
                Credit Card Number:
              </label>
              <input type="text" id="card_number" name="card_number" placeholder="Enter card number" required value={paymentInfo.card_number} 
              onChange={handlePaymentChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="cardcvv" className="block text-sm font-medium text-gray-700">
                CVV:
              </label>
              <input type="text" id="cardcvv" name="cardcvv" placeholder="Enter CVV" required value={paymentInfo.cardcvv} 
              onChange={handlePaymentChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="card_expiry_date" className="block text-sm font-medium text-gray-700">
                Expiry Date:
              </label>
              <input type="text" id="card_expiry_date" name="card_expiry_date" placeholder="Enter expiry date" required value={paymentInfo.card_expiry_date}
               onChange={handlePaymentChange} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
            </div>
            <div className="mb-4">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                Amount:
              </label>
              <input type="text" id="amount" name="amount" placeholder="Enter amount" required value={paymentInfo.amount} onChange={handlePaymentChange} 
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-red-500 focus:border-red-500" />
            </div>
          </div>
        </div>
        <button type="submit" className="block w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-red-700
         focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Proceed to Checkout</button>
      </form>
    </div>
  );
};
export default Payment;

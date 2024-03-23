import React, { useState, useEffect } from "react";
import axios from "axios";

const Payment = () => {
  const [patientId, setPatientId] = useState('');
  const [amount, setAmount] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [cardExpiryDate, setCardExpiryDate] = useState('');
  const [cardCVV, setCardCVV] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        patient: {
          id: patientId,
        },
        amount,
        cardNumber,
        cardHolderName,
        cardExpiryDate,
        cardCVV,
      };
      const response = await axios.post(
        "http://localhost:8080/api/payments",
        postData
      );

      console.log("Payment created successfully:", response.data);
      // Reset form fields after submission
      setPatientId('');
      setAmount('');
      setCardNumber('');
      setCardHolderName('');
      setCardExpiryDate('');
      setCardCVV('');

    } 
    catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Payment Form</h2>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="patientId">Patient ID:</label>
            <input type="number" id="patientId" value={patientId} onChange={(e) => setPatientId(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="amount">Amount:</label>
            <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="cardNumber">Card Number:</label>
            <input type="text" id="cardNumber" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="cardHolderName">Card Holder Name:</label>
            <input type="text" id="cardHolderName" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="cardExpiryDate">Card Expiry Date:</label>
            <input type="text" id="cardExpiryDate" value={cardExpiryDate} onChange={(e) => setCardExpiryDate(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="cardCVV">Card CVV:</label>
            <input type="text" id="cardCVV" value={cardCVV} onChange={(e) => setCardCVV(e.target.value)} className="input-field" />
          </div>
        </div>
        <button type="submit" className="block mt-6 w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Make Payment</button>
      </form>
    </div>
  );
};

export default Payment;

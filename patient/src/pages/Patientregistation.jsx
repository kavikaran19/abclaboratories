import React, { useState } from 'react';
import axios from 'axios';

function PatientRegistration() {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        address: '',
        mobileNumber: '', // Changed from mobile_number to mobileNumber
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/patients', formData);
            // if (response.status !== 200) {
            //     throw new Error('Failed to submit patient registration');
            // }
            // Reset form data after successful submission
            setFormData({
                name: '',
                age: '',
                address: '',
                mobileNumber: '',
                email: ''
            });
            console.log("sucess")
            // Handle success (e.g., show a success message)
        } catch (error) {
            console.error(error);
            // Handle error (e.g., show an error message)
        }
    };

    return (
        
            <div className="flex justify-end items-end  bg-gray-100">
            <div className="max-w-lg w-full bg-gray-400 rounded-lg shadow-lg p-10 mx-10">
                <h2 className="text-2xl font-semibold mb-8 text-center ">Patient Registration</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Patient name" className="w-full border rounded-md px-3 py-2" />
                    <input type="text" name="age" value={formData.age} onChange={handleChange} placeholder="Age" className="w-full border rounded-md px-3 py-2" />
                    <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="w-full border rounded-md px-3 py-2" />
                    <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="Mobile Number" className="w-full border rounded-md px-3 py-2" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="w-full border rounded-md px-3 py-2" />
                    <button type="submit" className="w-full bg-red-600 text-white rounded-md px-3 py-2">Save</button>
                </form>
            </div>
        </div>
        
    );
}

export default PatientRegistration;

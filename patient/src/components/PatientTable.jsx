import React, { useState, useEffect } from 'react';

const PatientTable = () => {
  // State to store fetched data
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedAge, setEditedAge] = useState('');
  const [editedAddress, setEditedAddress] = useState('');
  const [editedMobileNumber, setEditedMobileNumber] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/patients/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setPatients(data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures it runs only once

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/patients/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete patient');
      }
      // Update patients state after successful deletion
      setPatients(patients.filter(patient => patient.id !== id));
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };
  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setEditedName(patient.name);
    setEditedAge(patient.age);
    setEditedAddress(patient.address);
    setEditedMobileNumber(patient.mobileNumber);
    setEditedEmail(patient.email);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/patients/edit/${editingPatient.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedName,
          age: editedAge,
          address: editedAddress,
          mobileNumber: editedMobileNumber,
          email: editedEmail,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update patient');
      }
      setEditingPatient(null);
      // Fetch updated patient data
      fetchData();
    } catch (error) {
      console.error('Error updating patient:', error);
    }
  };
  return (
    <div className="flex flex-col">
      <div className="-m-1 overflow-x-auto">
        <div className="p-12 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Age</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Address</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Mobile Number</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Email</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {patients.map(patient => (
                  <tr key={patient.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.age}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.address}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.mobileNumber}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{patient.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => handleDelete(patient.id)} className="text-red-500">Delete</button>
                      <button onClick={() => handleEdit(patient)} className="text-blue-500 ml-2">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Edit form */}
      {editingPatient && (
        <div className="fixed top-0 left-12 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Patient</h2>
            <input
              type="text"
              placeholder="Name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full border-gray-300 rounded-md mb-2 p-2"
            />
            <input
              type="text"
              placeholder="Age"
              value={editedAge}
              onChange={(e) => setEditedAge(e.target.value)}
              className="w-full border-gray-300 rounded-md mb-2 p-2"
            />
            <input
              type="text"
              placeholder="Address"
              value={editedAddress}
              onChange={(e) => setEditedAddress(e.target.value)}
              className="w-full border-gray-300 rounded-md mb-2 p-2"
            />
            <input
              type="text"
              placeholder="Mobile Number"
              value={editedMobileNumber}
              onChange={(e) => setEditedMobileNumber(e.target.value)}
              className="w-full border-gray-300 rounded-md mb-2 p-2"
            />
            <input
              type="text"
              placeholder="Email"
              value={editedEmail}
              onChange={(e) => setEditedEmail(e.target.value)}
              className="w-full border-gray-300 rounded-md mb-2 p-2"
            />
            <div className="flex justify-end">
              <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
              <button onClick={() => setEditingPatient(null)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>

    
  );
};

export default PatientTable;

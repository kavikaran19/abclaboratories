import React, { useState, useEffect } from 'react';

const DoctorTable = () => {
  // State to store fetched data
  const [doctor, setDoctor] = useState([]);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedSpecialization, setEditedSpecialization] = useState('');

  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/doctors/all');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setDoctor(data); // Update state with fetched data
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
      const response = await fetch(`http://localhost:8080/api/doctors/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete doctor');
      }
      // Update doctor state after successful deletion
      setDoctor(doctor.filter(doctor => doctor.id !== id));
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setEditedName(doctor.name);
    setEditedSpecialization(doctor.specialization);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/doctors/edit/${editingDoctor.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedName,
          specialization: editedSpecialization,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update doctor');
      }
      setEditingDoctor(null);
      // Fetch updated doctor data
      fetchData();
    } catch (error) {
      console.error('Error updating doctor:', error);
    }
  };

  return (
    <div className="flex flex-col">
      <a href="/adddoctor">
      <button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Add doctor</button>
      </a>
      <div className="-m-1 overflow-x-auto">
        <div className="p-12 min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead>
                <tr>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Specialization</th>
                  <th scope="col" className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {doctor.map(doctor => (
                  <tr key={doctor.id}>
                    <td className="px-6 py-4 whitespace-nowrap">{doctor.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doctor.specialization}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button onClick={() => handleDelete(doctor.id)} className="text-red-500">Delete</button>
                      <button onClick={() => handleEdit(doctor)} className="text-blue-500 ml-2">Edit</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/* Edit form */}
      {editingDoctor && (
        <div className="fixed top-0 left-12 w-full h-full bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Doctor</h2>
            <input
              type="text"
              placeholder="Name"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full border-gray-300 rounded-md mb-2 p-2"
            />
            <input
              type="text"
              placeholder="Specialization"
              value={editedSpecialization}
              onChange={(e) => setEditedSpecialization(e.target.value)}
              className="w-full border-gray-300 rounded-md mb-2 p-2"
            />
            <div className="flex justify-end">
              <button onClick={handleSaveEdit} className="bg-blue-500 text-white px-4 py-2 rounded-md">Save</button>
              <button onClick={() => setEditingDoctor(null)} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md ml-2">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorTable;

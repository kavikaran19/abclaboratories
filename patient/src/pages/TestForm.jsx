import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TestForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [testName, setTestName] = useState('');
  const [testDescription, setTestDescription] = useState('');
  const [testPrice, setTestPrice] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [technicianRes, patientRes, doctorRes] = await Promise.all([
          axios.get("http://localhost:8080/api/technicians/all"),
          axios.get("http://localhost:8080/api/patients/all"),
          axios.get("http://localhost:8080/api/doctors/all")
        ]);

        setTechnicians(technicianRes.data);
        setPatients(patientRes.data);
        setDoctors(doctorRes.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching data.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        testName,
        testDescription,
        testPrice,
        technician: { id: selectedTechnician },
        patient: { id: selectedPatient },
        doctor: { id: selectedDoctor }
      };
      
      await axios.post("http://localhost:8080/api/tests", postData);

      console.log("Test created successfully.");
      // Reset form fields after submission
      setTestName('');
      setTestDescription('');
      setTestPrice('');
      setSelectedTechnician('');
      setSelectedPatient('');
      setSelectedDoctor('');

    } catch (error) {
      console.error("Error creating test:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-red-600 mb-6">Test Form</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="testName" className="block text-sm font-medium text-gray-700">Test Name</label>
            <input type="text" id="testName" value={testName} onChange={(e) => setTestName(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="testDescription" className="block text-sm font-medium text-gray-700">Test Description</label>
            <input type="text" id="testDescription" value={testDescription} onChange={(e) => setTestDescription(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="testPrice" className="block text-sm font-medium text-gray-700">Test Price</label>
            <input type="number" id="testPrice" value={testPrice} onChange={(e) => setTestPrice(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="selectedTechnician" className="block text-sm font-medium text-gray-700">Select Technician</label>
            <select id="selectedTechnician" value={selectedTechnician} onChange={(e) => setSelectedTechnician(e.target.value)} className="input-field">
              <option value="">Select Technician</option>
              {technicians.map((technician) => (
                <option key={technician.id} value={technician.id}>{technician.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="selectedPatient" className="block text-sm font-medium text-gray-700">Select Patient</label>
            <select id="selectedPatient" value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)} className="input-field">
              <option value="">Select Patient</option>
              {patients.map((patient) => (
                <option key={patient.id} value={patient.id}>{patient.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="selectedDoctor" className="block text-sm font-medium text-gray-700">Select Doctor</label>
            <select id="selectedDoctor" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} className="input-field">
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="block mt-8 w-full rounded-md bg-red-600 px-4 py-2 text-center text-sm font-semibold text-white hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Create Test</button>
      </form>
    </div>
  );
};

export default TestForm;

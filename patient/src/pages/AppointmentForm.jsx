import React, { useState, useEffect } from "react";
import axios from "axios";

const AppointmentForm = () => {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [reasonAppointment, setReasonAppointment] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [appointmentNumber, setAppointmentNumber] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');

  useEffect(() => {
    // Fetch the list of doctors from the backend API
    axios
      .get("http://localhost:8080/api/doctors/all")
      .then((response) => {
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching doctors:", error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare the data for the POST request
      const postData = {
        name,
        age,
        gender,
        mobileNumber,
        reasonAppointment,
        appointmentTime,
        appointmentNumber,
        doctor: {
          id: selectedDoctor,
        },
      };
      const response = await axios.post(
        "http://localhost:8080/api/appointments",
        postData
      );

      console.log("Form submitted successfully:", response.data);
      // Reset form fields after submission
      setName('');
      setAge('');
      setGender('');
      setMobileNumber('');
      setReasonAppointment('');
      setAppointmentTime('');
      setAppointmentNumber('');
      setSelectedDoctor('');

    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="max-w-md  bg-gray-300 p-8 rounded shadow-lg mx-10">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Appointment Form</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label htmlFor="name">Name:</label>
            <input  type="text" id="name"  value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="age">Age:</label>
            <input type="number" id="age" value={age} onChange={(e) => setAge(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <input type="text" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input type="text" id="mobileNumber" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="reasonAppointment">Reason for Appointment:</label>
            <input type="text" id="reasonAppointment" value={reasonAppointment} onChange={(e) => setReasonAppointment(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="appointmentTime">Appointment Time:</label>
            <input type="datetime-local" id="appointmentTime" value={appointmentTime} onChange={(e) => setAppointmentTime(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="appointmentNumber">Appointment Number:</label>
            <input type="text" id="appointmentNumber" value={appointmentNumber} onChange={(e) => setAppointmentNumber(e.target.value)} className="input-field" />
          </div>
          <div>
            <label htmlFor="selectedDoctor">Select Doctor:</label>
            <select id="selectedDoctor" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)} className="input-field">
              <option value="">Select Doctor</option>
              {doctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
              ))}
            </select>
          </div>
        </div>
        <button type="submit" className="block mt-6 w-full rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white
         hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Submit</button>
      </form>
    </div>
  );
};

export default AppointmentForm;

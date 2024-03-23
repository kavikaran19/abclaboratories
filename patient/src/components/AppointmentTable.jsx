import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";

const AppointmentTable = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState({});

  useEffect(() => {
    // Fetch appointments from the backend API
    axios
      .get("http://localhost:8080/api/appointments/all")
      .then((response) => {
        setAppointments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching appointments:", error);
      });
  }, []);

  useEffect(() => {
    // Fetch doctor details
    const fetchDoctors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/doctors/all");
        const doctorsData = {};
        response.data.forEach((doctor) => {
          doctorsData[doctor.id] = doctor.name;
        });
        setDoctors(doctorsData);
      } catch (error) {
        console.error("Error fetching doctor details:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/appointments/delete/${id}`);
      setAppointments(appointments.filter((appointment) => appointment.id !== id));
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleDownloadPDF = (appointment) => {
    const doc = new jsPDF();
    doc.autoTable({
      head: [
        ["Name", "Age", "Gender", "Mobile Number", "Reason for Appointment", "Appointment Time", "Appointment Number", "Doctor"],
      ],
      body: [
        [appointment.name, appointment.age, appointment.gender, appointment.mobileNumber, appointment.reasonAppointment, appointment.appointmentTime, appointment.appointmentNumber, doctors[appointment.doctor.id]],
      ],
    });
    doc.save(`${appointment.name}_appointment.pdf`);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-semibold text-red-600 mb-4">Appointment Table</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile Number</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason for Appointment</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment Time</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment Number</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.age}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.gender}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.mobileNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.reasonAppointment}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.appointmentTime}</td>
              <td className="px-6 py-4 whitespace-nowrap">{appointment.appointmentNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{doctors[appointment.doctor.id]}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleDelete(appointment.id)} className="text-red-600 hover:text-red-900 focus:outline-none">Delete</button>
                <button onClick={() => handleDownloadPDF(appointment)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
                  Download PDF
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentTable;

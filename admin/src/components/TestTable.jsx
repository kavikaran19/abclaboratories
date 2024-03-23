import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { GrDocumentPdf } from "react-icons/gr";


const TestTable = () => {
  const [tests, setTests] = useState([]);
  const [doctors, setDoctors] = useState({});
  const [patients, setPatients] = useState({});
  const [technicians, setTechnicians] = useState({});

  useEffect(() => {
    // Fetch test details from the backend API
    axios
      .get("http://localhost:8080/api/tests/viewall")
      .then((response) => {
        setTests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tests:", error);
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

  useEffect(() => {
    // Fetch patient details
    const fetchPatients = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/patients/all");
        const patientsData = {};
        response.data.forEach((patient) => {
          patientsData[patient.id] = patient.name;
        });
        setPatients(patientsData);
      } catch (error) {
        console.error("Error fetching patient details:", error);
      }
    };
    fetchPatients();
  }, []);

  useEffect(() => {
    // Fetch technician details
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/technicians/all");
        const techniciansData = {};
        response.data.forEach((technician) => {
          techniciansData[technician.id] = technician.name;
        });
        setTechnicians(techniciansData);
      } catch (error) {
        console.error("Error fetching technician details:", error);
      }
    };
    fetchTechnicians();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tests/delete/${id}`);
      setTests(tests.filter((test) => test.id !== id));
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  const handleDownloadPDF = (test) => {
    try {
      const doc = new jsPDF();
      doc.autoTable({
        head: [
          ["Test Name", "Description", "Price", "Technician", "Patient", "Doctor"],
        ],
        body: [
          [test.testName, test.testDescription, test.testPrice, technicians[test.technician.id], patients[test.patient.id], doctors[test.doctor.id]],
        ],
      });
      doc.save(`${test.testName}_details.pdf`);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test Name</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {tests.map((test) => (
            <tr key={test.id}>
              <td className="px-6 py-4 whitespace-nowrap">{test.testName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{test.testDescription}</td>
              <td className="px-6 py-4 whitespace-nowrap">{test.testPrice}</td>
              <td className="px-6 py-4 whitespace-nowrap">{technicians[test.technician.id]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{patients[test.patient.id]}</td>
              <td className="px-6 py-4 whitespace-nowrap">{doctors[test.doctor.id]}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button onClick={() => handleDelete(test.id)} className="text-red-600 hover:text-red-900 focus:outline-none">Delete</button>
                <button onClick={() => handleDownloadPDF(test)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded ml-2">
                  Download PDF<GrDocumentPdf />

                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TestTable;

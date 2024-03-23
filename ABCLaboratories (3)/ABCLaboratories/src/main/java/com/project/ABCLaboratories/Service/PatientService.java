package com.project.ABCLaboratories.Service;

import com.project.ABCLaboratories.Model.Patient;
import com.project.ABCLaboratories.Repository.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PatientService {
    @Autowired
    private PatientRepository patientRepository;
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }
    public Patient getPatientById(Long id) {
        return patientRepository.findById(id).orElse(null);
    }
    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }
    public Patient updatePatient(Long id, Patient updatedPatient) {
        Patient patient = patientRepository.findById(id).orElse(null);
        if (patient != null) {
            patient.setName(updatedPatient.getName());
            patient.setAge(updatedPatient.getAge());
            patient.setAddress(updatedPatient.getAddress());
            patient.setMobileNumber(updatedPatient.getMobileNumber());
            patient.setEmail(updatedPatient.getEmail());
            return patientRepository.save(patient);
        }
        return null; // or throw an exception
    }
    public void deletePatient(Long id) {
        patientRepository.deleteById(id);
    }
}

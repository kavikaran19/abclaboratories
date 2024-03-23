package com.project.ABCLaboratories.Service;

import com.project.ABCLaboratories.Model.Technician;
import com.project.ABCLaboratories.Repository.TechnicianRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TechnicianService {
    @Autowired
    private TechnicianRepository technicianRepository;
    public List<Technician> getAllTechnicians() {
        return technicianRepository.findAll();
    }
    public Technician getTechnicianById(Long id) {
        return technicianRepository.findById(id).orElse(null);
    }
    public Technician createTechnician(Technician technician) {
        return technicianRepository.save(technician);
    }
    public Technician updateTechnician(Long id, Technician updatedTechnician) {
        Technician technician = technicianRepository.findById(id).orElse(null);
        if (technician != null) {
            technician.setName(updatedTechnician.getName());
            technician.setSpecialization(updatedTechnician.getSpecialization());
            return technicianRepository.save(technician);
        }
        return null; // or throw an exception
    }
    public void deleteTechnician(Long id) {
        technicianRepository.deleteById(id);
    }
}

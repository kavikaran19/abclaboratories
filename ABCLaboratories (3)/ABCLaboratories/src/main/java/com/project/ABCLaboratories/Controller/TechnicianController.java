package com.project.ABCLaboratories.Controller;


import com.project.ABCLaboratories.Model.Technician;
import com.project.ABCLaboratories.Service.TechnicianService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping
@CrossOrigin
public class TechnicianController {


    @Autowired
    private TechnicianService technicianService;

    @GetMapping("/api/technicians/all")
    public List<Technician> getAllTechnicians() {
        return technicianService.getAllTechnicians();
    }

    @GetMapping("/api/technicians/view/{id}")
    public ResponseEntity<Technician> getTechnicianById(@PathVariable Long id) {
        Technician technician = technicianService.getTechnicianById(id);
        if (technician != null) {
            return ResponseEntity.ok(technician);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/api/technicians")
    public ResponseEntity<Technician> createTechnician(@RequestBody Technician technician) {
        Technician createdTechnician = technicianService.createTechnician(technician);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTechnician);
    }

    @PutMapping("/api/technicians/edit/{id}")
    public ResponseEntity<Technician> updateTechnician(@PathVariable Long id, @RequestBody Technician updatedTechnician) {
        Technician technician = technicianService.updateTechnician(id, updatedTechnician);
        if (technician != null) {
            return ResponseEntity.ok(technician);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/api/technicians/delete/{id}")
    public ResponseEntity<Void> deleteTechnician(@PathVariable Long id) {
        technicianService.deleteTechnician(id);
        return ResponseEntity.noContent().build();
    }
}

package com.project.ABCLaboratories.Service;

import com.project.ABCLaboratories.Model.Test;
import com.project.ABCLaboratories.Repository.TestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TestService {
    @Autowired
    private TestRepository testRepository;
    public List<Test> getAllTests() {
        return testRepository.findAll();
    }
    public Test getTestById(Long id) {
        return testRepository.findById(id).orElse(null);
    }
    public Test createTest(Test test) {
        return testRepository.save(test);
    }
    public Test updateTest(Long id, Test updatedTest) {
        Test test = testRepository.findById(id).orElse(null);
        if (test != null) {
            test.setTestName(updatedTest.getTestName());
            test.setTestDescription(updatedTest.getTestDescription());
            test.setTestPrice(updatedTest.getTestPrice());
            test.setTechnician(updatedTest.getTechnician());
            test.setPatient(updatedTest.getPatient());
            test.setDoctor(updatedTest.getDoctor());
            return testRepository.save(test);
        }
        return null; // or throw an exception
    }

    public void deleteTest(Long id) {
        testRepository.deleteById(id);
    }

}

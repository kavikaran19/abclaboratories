package com.project.ABCLaboratories.Controller;
import com.project.ABCLaboratories.Model.Payment;
import com.project.ABCLaboratories.Service.EmailService;
import com.project.ABCLaboratories.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin
@RestController
@RequestMapping
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private EmailService emailService;

    @GetMapping("/api/payments/all")
    public List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @GetMapping("/api/payments/view/{id}")
    public ResponseEntity<Payment> getPaymentById(@PathVariable Long id) {
        Payment payment = paymentService.getPaymentById(id);
        if (payment != null) {
            return ResponseEntity.ok(payment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/api/payments")
    public ResponseEntity<Payment> createPayment(@RequestBody Payment payment) {
        Payment createdPayment = paymentService.createPayment(payment);
        if (createdPayment != null) {
            sendPaymentConfirmationEmail(createdPayment);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdPayment);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
    @PutMapping("/api/payments/edit/{id}")
    public ResponseEntity<Payment> updatePayment(@PathVariable Long id, @RequestBody Payment updatedPayment) {
        Payment payment = paymentService.updatePayment(id, updatedPayment);
        if (payment != null) {
            return ResponseEntity.ok(payment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @DeleteMapping("/api/payments/delete/{id}")
    public ResponseEntity<Void> deletePayment(@PathVariable Long id) {
        paymentService.deletePayment(id);
        return ResponseEntity.noContent().build();
    }
    private void sendPaymentConfirmationEmail(Payment payment) {
        String recipientEmail = payment.getPatient().getEmail();
        double amount = payment.getAmount();
        emailService.sendPaymentReceiptEmail(recipientEmail, amount);
    }
}

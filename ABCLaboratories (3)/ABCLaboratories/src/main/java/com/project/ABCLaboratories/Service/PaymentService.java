package com.project.ABCLaboratories.Service;


import com.project.ABCLaboratories.Model.Payment;
import com.project.ABCLaboratories.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private EmailService emailService;

    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    public Payment getPaymentById(Long id) {
        return paymentRepository.findById(id).orElse(null);
    }

    public Payment createPayment(Payment payment) {
        Payment createdPayment = paymentRepository.save(payment);
        sendPaymentReceiptEmail(payment.getPatient().getEmail(), payment.getAmount());
        return createdPayment;
    }

    public Payment updatePayment(Long id, Payment updatedPayment) {
        Payment payment = paymentRepository.findById(id).orElse(null);
        if (payment != null) {
            payment.setPatient(updatedPayment.getPatient());
            payment.setAmount(updatedPayment.getAmount());
            payment.setPaymentDate(updatedPayment.getPaymentDate());
            payment.setCardNumber(updatedPayment.getCardNumber());
            payment.setCardHolderName(updatedPayment.getCardHolderName());
            payment.setCardExpiryDate(updatedPayment.getCardExpiryDate());
            payment.setCardCVV(updatedPayment.getCardCVV());
            return paymentRepository.save(payment);
        }
        return null; // or throw an exception
    }

    public void deletePayment(Long id) {
        paymentRepository.deleteById(id);
    }

    private void sendPaymentReceiptEmail(String to, double amount) {
        emailService.sendPaymentReceiptEmail(to, amount);
    }
}
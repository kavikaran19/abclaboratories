package com.project.ABCLaboratories.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender emailSender;

    public void sendPaymentReceiptEmail(String to, double amount) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("Payment Receipt from ABC Laboratories");
        message.setText("Dear Patient,\n\nYour payment of $" + amount + " has been successfully processed. Thank you for choosing ABC Laboratories.\n\nBest regards,\nABC Laboratories Team");
        emailSender.send(message);
    }
}

package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Appointment;
import com.example.demo.service.AppointmentService;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin("*")
public class AppointmentController {

    @Autowired
    private AppointmentService service;

    @PostMapping
    public Appointment book(@RequestBody Appointment appointment) {
        return service.bookAppointment(appointment);
    }

    @GetMapping
    public List<Appointment> getAll() {
        return service.getAllAppointments();
    }
}
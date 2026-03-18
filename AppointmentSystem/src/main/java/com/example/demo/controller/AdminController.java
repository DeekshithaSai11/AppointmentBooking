package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.User;
import com.example.demo.entity.Appointment;
import com.example.demo.entity.Place;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.AppointmentRepository;
import com.example.demo.repository.PlaceRepository;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private PlaceRepository placeRepository;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/appointments")
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

    @GetMapping("/places")
    public List<Place> getAllPlaces(){
        return placeRepository.findAll();
    }

    @DeleteMapping("/appointments/{id}")
    public String deleteAppointment(@PathVariable Long id) {
        appointmentRepository.deleteById(id);
        return "Appointment deleted successfully";
    }
}
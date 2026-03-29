package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.service.SlotService;
import com.example.demo.entity.TimeSlot;

import java.util.List;

@RestController
@RequestMapping("/api/slots")
public class SlotController {

    @Autowired
    private SlotService service;

    @GetMapping
    public List<TimeSlot> getSlots() {
        return service.getSlots();
    }
    @PostMapping
    public TimeSlot addSlot(@RequestBody TimeSlot slot) {
        return service.save(slot);
    }

}
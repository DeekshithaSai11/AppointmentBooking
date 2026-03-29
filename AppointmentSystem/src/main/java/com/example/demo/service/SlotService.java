package com.example.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.repository.SlotRepository;
import com.example.demo.entity.TimeSlot;

import java.util.List;

@Service
public class SlotService {

    @Autowired
    private SlotRepository repository;

    public List<TimeSlot> getSlots() {
        return repository.findAll();
    }
    public TimeSlot save(TimeSlot slot) {
        return repository.save(slot);
    }

}
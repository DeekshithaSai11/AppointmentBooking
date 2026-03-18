package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.TimeSlot;

public interface SlotRepository extends JpaRepository<TimeSlot, Long> {

}
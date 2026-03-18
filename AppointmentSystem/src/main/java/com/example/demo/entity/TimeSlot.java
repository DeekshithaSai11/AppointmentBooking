package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "time_slot")
public class TimeSlot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 20, nullable = false)
    private String date;

    @Column(length = 20, nullable = false)
    private String time;

    @Column(nullable = false)
    private boolean available;

    public Long getId() { return id; }
    public String getDate() { return date; }
    public String getTime() { return time; }
    public boolean isAvailable() { return available; }

    public void setDate(String date) { this.date = date; }
    public void setTime(String time) { this.time = time; }
    public void setAvailable(boolean available) { this.available = available; }
}
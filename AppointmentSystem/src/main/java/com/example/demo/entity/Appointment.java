package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "appointment")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName;
    private String serviceType;
    private String place;
    private String slot;
    private String date;

    public Long getId() { return id; }

    public String getUserName() { return userName; }

    public String getServiceType() { return serviceType; }

    public String getPlace() { return place; }

    public String getSlot() { return slot; }

    public String getDate() { return date; }

    public void setUserName(String userName) { this.userName = userName; }

    public void setServiceType(String serviceType) { this.serviceType = serviceType; }

    public void setPlace(String place) { this.place = place; }

    public void setSlot(String slot) { this.slot = slot; }

    public void setDate(String date) { this.date = date; }
}
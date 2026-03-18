package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "place")
public class Place {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 255)
    private String name;

    @Column(length = 255)
    private String location;

    @Column(length = 100)
    private String serviceType;

    public Long getId() { return id; }

    public String getName() { return name; }

    public String getLocation() { return location; }

    public String getServiceType() { return serviceType; }

    public void setName(String name) { this.name = name; }

    public void setLocation(String location) { this.location = location; }

    public void setServiceType(String serviceType) { this.serviceType = serviceType; }
}
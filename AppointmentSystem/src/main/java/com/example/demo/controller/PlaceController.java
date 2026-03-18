package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.demo.entity.Place;
import com.example.demo.repository.PlaceRepository;

import java.util.List;

@RestController
@RequestMapping("/api/places")
@CrossOrigin("*")
public class PlaceController {

    @Autowired
    private PlaceRepository placeRepository;

    @GetMapping
    public List<Place> getAllPlaces() {
        return placeRepository.findAll();
    }

    @PostMapping
    public Place addPlace(@RequestBody Place place) {
        return placeRepository.save(place);
    }

    @DeleteMapping("/{id}")
    public String deletePlace(@PathVariable Long id) {
        placeRepository.deleteById(id);
        return "Place deleted successfully";
    }
}
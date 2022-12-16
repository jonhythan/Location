package com.godin.locationSpring.controller;

import com.godin.locationSpring.model.Signalement;
import com.godin.locationSpring.service.SignalementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class SignalementController {

    @Autowired
    private SignalementService signalementService;

    @PostMapping(value = "/signalement", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void createSignalement(@RequestBody Signalement signalement) {
    	signalement.setDateSignalement(new Timestamp(System.currentTimeMillis()));
        signalementService.createSignalement(signalement);
    }

    @GetMapping(value = "/signalements", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Signalement> getAllSignalements() {
        return signalementService.getAllSignalements();
    }
}

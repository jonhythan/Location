package com.godin.locationSpring.controller;

import com.godin.locationSpring.model.Signalement;
import com.godin.locationSpring.service.SignalementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class SignalementController {

    @Autowired
    private SignalementService signalementService;

    @PostMapping(value = "/signalement", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public Signalement createSignalement(@RequestBody Signalement signalement) {
        return signalementService.createSignalement(signalement);
    }

    @GetMapping(value = "/signalements", produces = MediaType.APPLICATION_JSON_VALUE)
    public List<Signalement> getAllSignalements() {
        return signalementService.getAllSignalements();
    }
}

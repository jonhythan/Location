package com.godin.locationSpring.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.godin.locationSpring.model.Annonce;
import com.godin.locationSpring.service.AnnonceService;

@RestController
public class AnnonceController {
	
	@Autowired
	AnnonceService annonceService;
	
	@GetMapping("/annonces")	
	public Annonce getAnnonces(){
		return annonceService.getOneAnnonce();
	}
	
	@PostMapping("annonce/insert")
	public boolean insertAnnonce(@RequestBody Map<String, Object> body) {
		
		return annonceService.insert(body);
	}
}

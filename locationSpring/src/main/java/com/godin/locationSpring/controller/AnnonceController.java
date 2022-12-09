package com.godin.locationSpring.controller;

import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.godin.locationSpring.model.Annonce;
import com.godin.locationSpring.service.AnnonceService;
import com.godin.locationSpring.service.DetailService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AnnonceController {
	
	@Autowired
	AnnonceService annonceService;
	
	@Autowired
	DetailService detailService;
	
	@GetMapping("/annonces")	
	public Annonce getAnnonces(){
		return annonceService.getOneAnnonce();
	}
	
	@PostMapping("annonce/insert")
	@Transactional
	public String insertAnnonce(@RequestBody Map<String, Object> body) {
		try {
			@SuppressWarnings("unchecked")
			List<Map<String, Object>> listeDetail= (List<Map<String, Object>>)body.get("listeDetail");
			Map<String, Object> annonceMap = (Map<String, Object>)body.get("annonce");
			int annonceId = annonceService.insert(annonceMap);
			
			
			detailService.insert(listeDetail, annonceId);
			
			return "enregistré";
			
		} catch (Exception e) {
			return e.toString();
		}
		
		
	}
}

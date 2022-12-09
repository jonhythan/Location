package com.godin.locationSpring.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.godin.locationSpring.model.Categorie;
import com.godin.locationSpring.model.CategoriePeriode;
import com.godin.locationSpring.model.Detail;
import com.godin.locationSpring.model.EtatOutil;
import com.godin.locationSpring.service.CategoriePeriodeService;
import com.godin.locationSpring.service.CategorieService;
import com.godin.locationSpring.service.DetailService;
import com.godin.locationSpring.service.EtatOutilService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UtilitiesController {
	@Autowired 
	CategorieService categorieService;
	
	@Autowired
	EtatOutilService etatOutilService;
	
	@Autowired
	CategoriePeriodeService categoriePeriodeService;
	
	@Autowired
	DetailService detailService;
	
	@GetMapping("/categories")
	public List<Categorie> getAllCategories(){
		return categorieService.getAll();
	}
	
	@GetMapping("/etatsoutils")
	public List<EtatOutil> getAllEtatOutils(){
		return etatOutilService.getAll();
	}
	
	@GetMapping("/categorieperiodes")
	public List<CategoriePeriode> getAllCategoriePeriodes(){
		return categoriePeriodeService.getAll();
	}
	
	@GetMapping("/details")
	public List<Detail> getAllDetails(){
		return detailService.getAll();
	}
	
}

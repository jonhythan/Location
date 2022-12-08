package com.godin.locationSpring.controller;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.godin.locationSpring.model.Utilisateur;
import com.godin.locationSpring.repository.UtilisateurRepository;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UtilisateurController {
	@Autowired
	UtilisateurRepository utilisateurRepository;
	
	@GetMapping("/utilisateurs")
	public List<Utilisateur> getAllUsers(){
		return utilisateurRepository.findAll();
	}
	
	@PostMapping("/utilisateur")
	public String createUtilisateur(@RequestBody Map<String, String> body) {
		Utilisateur u = new Utilisateur();
		u.setNom(body.get("nom"));
		u.setPrenom(body.get("prenom"));
		u.setCourriel(body.get("courriel"));
		u.setNumRue(Integer.valueOf(body.get("numRue")));
		u.setNomRue(body.get("nomRue"));
		u.setProvince(body.get("province"));
		u.setCodePostal(body.get("codePostal"));
		u.setPassword(body.get("password"));
		u.setTelephone(new BigInteger(body.get("telephone")));
		u.setVille(body.get("ville"));
		
		try {
			utilisateurRepository.save(u);
			return "OK";
		} catch (Exception e) {
			return "ERREUR";
		}	
	}
	//à effacer
	@PostMapping("/img")
	public String uploadImage(@RequestBody Map<String, String> body) {
		String image = (body.get("image"));
		
		

		return "Annonce sauvegardée";
	}
	
	
}

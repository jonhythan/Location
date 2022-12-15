package com.godin.locationSpring.controller;

import java.math.BigInteger;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.godin.locationSpring.model.Membre;
import com.godin.locationSpring.model.Utilisateur;
import com.godin.locationSpring.service.MembreService;
import com.godin.locationSpring.service.UtilisateurService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UtilisateurController {
	@Autowired
	UtilisateurService utilisateurService;
	@Autowired
	MembreService membreService;
	
	@GetMapping("/utilisateurs")
	public List<Utilisateur> getAllUsers(){
		return utilisateurService.getAllUsers();
	}
	
	@Transactional
	@PostMapping("/utilisateur")
	public String createUtilisateur(@RequestBody Map<String, String> body) {
		Utilisateur u = new Utilisateur();
		Membre m = new Membre();
		
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
			int idMembre = utilisateurService.save(u);//returne l'id de l'utilisateur
			m.setUtilisateurId(idMembre);
			m.setStatus(true);
			membreService.save(m);
			return "ENREGISTRÉ";
			
		} catch (Exception e) {
			return "ERREUR";
		}	
	}

	@GetMapping("compte/{id}")
	public Utilisateur getUtilisateur(@PathVariable String id) {
		return utilisateurService.getUtilisateurById(Integer.valueOf(id));
	}
	
	@PostMapping("/compte/modifier")
	public Utilisateur modifierUtilisateur(@RequestBody Utilisateur utilisateur ) {
		return utilisateurService.modifierUtilisateur(utilisateur);
	}
	
	
	
}

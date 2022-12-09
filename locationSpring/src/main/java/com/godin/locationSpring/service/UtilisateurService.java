package com.godin.locationSpring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.godin.locationSpring.model.Utilisateur;
import com.godin.locationSpring.repository.UtilisateurRepository;

@Service
public class UtilisateurService {
	@Autowired
	UtilisateurRepository utilisateurRepository;
	
	public List<Utilisateur> getAllUsers(){
		return utilisateurRepository.findAll();
	}
	
	public int saveOne(Utilisateur u) {
		return utilisateurRepository.save(u).getId();
	}
}

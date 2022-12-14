package com.godin.locationSpring.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.godin.locationSpring.model.Utilisateur;
import com.godin.locationSpring.repository.UtilisateurRepository;

@Service
public class UtilisateurService {
    @Autowired
    UtilisateurRepository utilisateurRepository;

    public List<Utilisateur> getAllUsers() {
        return utilisateurRepository.findAll();
    }

    public int save(Utilisateur u) {
        return utilisateurRepository.save(u).getId();
    }

    public Utilisateur findUtilisateurByCourriel(String courriel) {
        Utilisateur utilisateur = utilisateurRepository.findUtilisateurByCourriel(courriel);
        return utilisateur;
    }

    public Utilisateur findUtilisateurByCourrielAndPassword(String courriel, String password) {
        Utilisateur utilisateur = utilisateurRepository.findUtilisateurByCourrielAndPassword(courriel, password);
        return utilisateur;
    }
}

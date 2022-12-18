package com.godin.locationSpring.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.godin.locationSpring.model.Annonce;

public interface AnnonceRepository extends JpaRepository<Annonce, Integer> {
	List<Annonce> findByUtilisateurProprietaireId(int utilisateurProprietaireId);
}

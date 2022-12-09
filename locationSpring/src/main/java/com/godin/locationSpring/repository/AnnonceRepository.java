package com.godin.locationSpring.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.godin.locationSpring.model.Annonce;

public interface AnnonceRepository extends JpaRepository<Annonce, Integer> {

}

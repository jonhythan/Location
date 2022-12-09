package com.godin.locationSpring.service;
import java.sql.Timestamp;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.godin.locationSpring.model.Annonce;
import com.godin.locationSpring.repository.AnnonceRepository;

@Service
public class AnnonceService {
	@Autowired
	AnnonceRepository annonceRepository;
	
	public Annonce getOneAnnonce() {
		Annonce annonce = annonceRepository.findAll().get(1);

		return annonce;
	}
	
	public int insert(Map<String, Object> body) {
		Annonce annonce = new Annonce();
		annonce.setUtilisateurProprietaireId((int)body.get("utilisateurProprietaireId"));
		annonce.setCategorieId((int)body.get("categorieId"));
		annonce.setEtatOutilId((int)body.get("etatOutilId"));
		annonce.setAdministrateurIdActivateur(null);
		annonce.setAdministrateurIdDesactivateur(null);
		annonce.setTitre((String)body.get("titre"));
		annonce.setDescription((String)body.get("description"));
		annonce.setImage((String)body.get("image"));
		annonce.setStatus(1);
		
		int i = annonceRepository.save(annonce).getId();	
		return i;
	}
}

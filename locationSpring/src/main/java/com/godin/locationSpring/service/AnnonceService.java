package com.godin.locationSpring.service;
import java.sql.Timestamp;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.godin.locationSpring.model.Annonce;
import com.godin.locationSpring.repository.AnnonceRepository;

@Service
public class AnnonceService {
	@Autowired
	AnnonceRepository annonceRepository;
	@Autowired
	DetailService detailService;
	
	public Annonce getOneAnnonce() {
		Annonce annonce = annonceRepository.findAll().get(1);
		return annonce;
	}
	public Annonce getAnnonce(int id) {
		Optional<Annonce> annonce =  annonceRepository.findById(id);
		return annonce.get();
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
	
	public void update(Annonce annonce) {
		Annonce annonce2 = annonceRepository.findById(annonce.getId()).get();
//		annonce2.getDetails().forEach(x->{
//			detailService.deleteDetail(x);
//		});
//		annonce2.getDetails().forEach(x->{
//			detailService.deleteDetail(x.getAnnonceId(), x.getCategoriePeriodeId());
//		});
//		annonce.getDetails().forEach(y->{
//			detailService.insert(y);
//		});
		annonce2.setDetails(annonce.getDetails());
		annonce2.setTitre(annonce.getTitre());
		annonce2.setDescription(annonce.getDescription());
		annonce2.setImage(annonce.getImage());
		annonce2.setCategorieId(annonce.getCategorieId());
		annonce2.setEtatOutilId(annonce.getEtatOutilId());
		
		annonceRepository.save(annonce2);
	}
}

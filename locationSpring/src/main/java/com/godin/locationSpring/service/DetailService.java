package com.godin.locationSpring.service;

import java.util.List;
import java.util.Map;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.godin.locationSpring.model.Detail;
import com.godin.locationSpring.repository.DetailRepository;

@Service
public class DetailService {
	@Autowired
	DetailRepository detailRepository;
	
	public List<Detail> getAll(){
		return detailRepository.findAll();
	}
	
	
	public boolean insert(List<Map<String, Object>> listeDetail, int annonceId) {
		for(int i =0; i< listeDetail.size(); i++) {
			listeDetail.get(i);
			Detail detail = new Detail();
			detail.setCategoriePeriodeId((int)listeDetail.get(i).get("id"));
			detail.setPrix(Double.valueOf(listeDetail.get(i).get("prix").toString()));
			detail.setAnnonceId(annonceId);
			detailRepository.save(detail);	
		}
		return true;
	}
}

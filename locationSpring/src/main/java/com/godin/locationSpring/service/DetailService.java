package com.godin.locationSpring.service;

import java.util.List;

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
}

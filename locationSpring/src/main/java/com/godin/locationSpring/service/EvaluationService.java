package com.godin.locationSpring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.godin.locationSpring.model.Evaluation;
import com.godin.locationSpring.model.idClass.EvaluationId;
import com.godin.locationSpring.repository.EvaluationRepository;

@Service
public class EvaluationService {
	
	@Autowired
	EvaluationRepository evaluationRepository;
	
	public Evaluation getEvaluation(int annonceId, int membreId) {
		return evaluationRepository.findById(new EvaluationId(annonceId, membreId)).get();
	}
	
	public List<Evaluation> getAll(){
		return evaluationRepository.findAll();
	}
}
